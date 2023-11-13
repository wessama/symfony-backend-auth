<?php

namespace App\Controller\Api;

use App\Entity\Photo;
use App\Entity\User;
use App\Form\RegistrationFormType;
use Aws\S3\S3Client;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Exception\ValidatorException;

class RegistrationController extends AbstractController
{
    private $logger;
    private $s3Client;

    public function __construct(LoggerInterface $logger, S3Client $s3Client)
    {
        $this->logger = $logger;
        $this->s3Client = $s3Client;
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     * @throws Exception
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder): JsonResponse
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user = new User;

        $form = $this->createForm(RegistrationFormType::class, $user);

        // Combine file and request data
        $formData = array_merge(
            $request->request->all(), // Regular form data
            ['avatar' => $request->files->get('avatar'), 'photos' => $request->files->get('photos')] // File uploads
        );

        $form->submit($formData);

        try {
            if ($form->isSubmitted() && $form->isValid()) {
                // Encode the password
                $user->setPassword($passwordEncoder->encodePassword($user, $form->get('password')->getData()));

                // Handle avatar file upload
                $avatarFile = $form->get('avatar')->getData();
                if ($avatarFile) {
                    $avatarFileInS3 = $this->uploadFileToS3($avatarFile);
                    $user->setAvatar($avatarFileInS3['url']);
                }

                // Handle photos file upload
                $photoFiles = $form->get('photos')->getData();
                foreach ($photoFiles as $file) {
                    $photoFileInS3 = $this->uploadFileToS3($file);

                    $photo = new Photo;
                    $photo->setName($photoFileInS3['name']);
                    $photo->setUrl($photoFileInS3['url']);

                    $user->addPhoto($photo);
                }

                // Persist the user and by consequence the photos collection
                $entityManager->getRepository(User::class)->add($user);

                return new JsonResponse(['status' => 'User registered successfully'], Response::HTTP_CREATED);
            }

            $errors = [];
            foreach ($form->getErrors(true) as $error) {
                $errors[] = $error->getMessage();
            }

            return new JsonResponse(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (Exception $e) {
            $this->logger->error("Error registering user {$request->request->get('email')}: " . $e->getMessage());
            return new JsonResponse(['error' => 'An error occurred during registration'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Uploads a file to AWS S3.
     *
     * @param UploadedFile $file The file to be uploaded.
     * @param S3Client     $s3Client The AWS S3 client for handling the upload.
     *
     * @return array<string, string> Returns an associative array containing:
     *                               - 'name': The name of the uploaded file.
     *                               - 'url': The publicly accessible URL of the file on S3.
     *
     * @throws ValidatorException If the file upload is invalid.
     * @throws Exception If the file upload to S3 fails. This includes network issues,
     *                   file handling errors, or AWS service exceptions.
     */
    private function uploadFileToS3(UploadedFile $file): array
    {
        if (! $file->isValid()) {
            throw new ValidatorException('Invalid file upload');
        }

        $s3Bucket = $this->getParameter('aws.s3_bucket');
        $fileName = uniqid() . '-' . $file->getClientOriginalName();

        // Upload to S3
        try {
            $result = $this->s3Client->putObject([
                'Bucket' => $s3Bucket,
                'Key'    => 'photos/' . $fileName,
                'Body'   => fopen($file->getPathname(), 'rb'),
                'ACL'    => 'public-read',
            ]);

            return [
                'name' => $fileName,
                'url' => $result->get('ObjectURL') ?? null,
            ];
        } catch (Exception $e) {
            $this->logger->error('File upload failed: ' . $e->getMessage());
            throw new Exception("Error uploading file to S3");
        }
    }
}
