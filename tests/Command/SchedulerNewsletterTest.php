<?php

namespace App\Tests\Command;

use App\Command\SchedulerSendNewsletterCommand;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class SchedulerNewsletterTest extends KernelTestCase
{
    public function testExecute(): void
    {
        self::bootKernel();
        $application = new Application(self::$kernel);

        // Create mock objects
        $userRepositoryMock = $this->createMock(UserRepository::class);
        $mailerMock = $this->createMock(MailerInterface::class);

        // Configure the methods
        $userRepositoryMock->method('findActiveUsersCreatedWithinThePastWeek')
            ->willReturn([
                [
                    'email' => 'wessam.ah@outlook.com',
                ]
            ]);
        $mailerMock->expects($this->any())
            ->method('send')
            ->with($this->isInstanceOf(Email::class));

        // Add the command to the application
        $command = new SchedulerSendNewsletterCommand($userRepositoryMock, $mailerMock);
        $application->add($command);

        // Run the command
        $commandTester = new CommandTester($command);
        $commandTester->execute([]);

        // Assertions
        $this->assertStringContainsString('Newsletter sent successfully!', $commandTester->getDisplay());
    }
}