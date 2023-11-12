<?php

namespace App\Controller\Api;

use App\Entity\Photo;
use App\Entity\User;
use App\Form\RegistrationFormType;
use Aws\S3\S3Client;
use Exception;
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
    /**
     * @Route("/register", name="register", methods={"POST"})
     * @throws Exception
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, S3Client $s3Client): JsonResponse
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user = new User();

        $form = $this->createForm(RegistrationFormType::class, $user);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        try {
            if ($form->isSubmitted() && $form->isValid()) {
                // Encode the password
                $user->setPassword($passwordEncoder->encodePassword($user, $form->get('password')->getData()));

                // Handle avatar file upload
                $avatarFile = $form->get('avatar')->getData();
                if ($avatarFile) {
                    $avatarFileUrl = $this->uploadFileToS3($avatarFile, $s3Client);
                    $user->setAvatar($avatarFileUrl['url']);
                }

                // Handle photos file upload
                $photoFiles = $form->get('photos')->getData();
                foreach ($photoFiles as $file) {
                    $photoFileUrl = $this->uploadFileToS3($file, $s3Client);

                    $photo = new Photo();
                    $photo->setName($photoFileUrl['name']);
                    $photo->setUrl($photoFileUrl['url']);

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
            $this->get('logger')->error('File upload failed: ' . $e->getMessage());
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
    private function uploadFileToS3(UploadedFile $file, S3Client $s3Client): array
    {
        if (! $file->isValid()) {
            throw new ValidatorException('Invalid file upload');
        }

        $s3Bucket = $this->getParameter('AWS_S3_BUCKET');
        $fileName = uniqid() . '-' . $file->getClientOriginalName();

        // Upload to S3
        try {
            $result = $s3Client->putObject([
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
            $this->get('logger')->error('File upload failed: ' . $e->getMessage());
            throw new Exception("Error uploading file to S3");
        }
    }
}
