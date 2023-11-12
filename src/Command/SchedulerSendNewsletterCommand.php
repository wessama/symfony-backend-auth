<?php

namespace App\Command;

use App\Repository\UserRepository;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class SchedulerSendNewsletterCommand extends Command
{
    protected static $defaultName = 'app:send-newsletter';

    protected static string $defaultDescription = 'Add a short description for your command';

    private ServiceEntityRepository $userRepository;
    private MailerInterface $mailer;

    public function __construct(UserRepository $userRepository, MailerInterface $mailer)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
        $this->mailer = $mailer;
    }

    protected function configure(): void
    {
        $this
            ->setDescription(self::$defaultDescription)
            ->setHelp('This command allows you to send a newsletter to all active users...');
    }

    /**
     * @throws TransportExceptionInterface
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $users = $this->userRepository->findActiveUsersCreatedWithinThePastWeek();
        $progressBar = new ProgressBar($output, count($users));

        $output->writeln('Sending newsletter to active users...');
        $progressBar->start();

        foreach ($users as $user) {
            $email = (new Email())
                ->to($user->getEmail())
                ->subject('Your best newsletter')
                ->text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id interdum nibh. Phasellus blandit tortor in cursus convallis. Praesent et tellus fermentum, pellentesque lectus at, tincidunt risus. Quisque in nisl malesuada, aliquet nibh at, molestie libero.");

            $this->mailer->send($email);
            $progressBar->advance();
        }

        $progressBar->finish();
        $output->writeln('Newsletter sent successfully!');

        return 0;
    }
}
