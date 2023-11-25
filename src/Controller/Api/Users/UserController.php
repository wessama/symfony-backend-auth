<?php

namespace App\Controller\Api\Users;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class UserController extends AbstractController
{
    /**
     * @Route("/me", name="me", methods={"GET"})
     */
    public function me(Security $security): JsonResponse
    {
        /** @var User $user */
        $user = $security->getUser();

        // Serialize the User object's public data
        $userData = $user->toPublicData();

        return new JsonResponse($userData);
    }
}
