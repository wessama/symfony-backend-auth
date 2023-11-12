<?php

namespace App\Controller\Api;

use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login()
    {
        // Intercepted by the firewall and handled automatically
        throw new RuntimeException('This should never be reached!');
    }
}
