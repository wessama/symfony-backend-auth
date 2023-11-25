<?php

namespace App\Tests\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class RegistrationTest extends WebTestCase
{
    public function testRegisterWillThrow422(): void
    {
        $client = static::createClient();

        $avatar = new UploadedFile(
            __DIR__ . '/../../public/uploads/default.jpeg',
            'avatar.png',
            'image/png',
            null
        );

        $formData = [
            'email' => 'wessam.ah@outlook.com',
            'password' => '123456',
            'firstName' => 'Wessam',
            'lastName' => 'Abdrabo',
            'avatar' => $avatar,
        ];

        $client->request('POST', '/api/register', [], ['avatar' => $avatar], ['CONTENT_TYPE' => 'multipart/form-data'], json_encode($formData));

        $this->assertEquals(Response::HTTP_UNPROCESSABLE_ENTITY, $client->getResponse()->getStatusCode());
    }
}