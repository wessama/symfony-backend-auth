# Symfony REST API for User Registration and Authentication

This README outlines the steps necessary to set up a Symfony application with user registration, JWT authentication, and a command for sending a daily newsletter.

The repository represents the first of a two-part task for a job application. The second part is a React frontend application that consumes the API.

For your convenience, features are split up into branches that you can check out to see the code for that feature. The assumption is that each branch represents a milestone in the project, for example
`feature/user-registration` represents the completion of the user registration feature. Since I'm the sole contributor, I didn't create PRs for each feature (I'd approve my code straight away anyway), but you can still see the code for each feature in the branches to
get a better idea of how the project was built.

## Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Composer
- MySQL or another database supported by Doctrine
- OpenSSL for generating JWT keys

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### Step 2: Install Dependencies

Install the project dependencies with Composer:

```bash
composer install
```

Copy the `.env` file to `.env.local` and update the environment variables to match your local environment:

```bash
cp .env .env.local
```

### Step 3: Configure the Database

Create a new database and add the connection details to your `.env.local` file. For example:

```dotenv
DATABASE_URL=mysql://user:password@localhost:3306/database_name
```

### Step 4: Generate JWT Keys

Generate the public and private keys for JWT authentication:

```bash
mkdir -p config/jwt # Do not change this directory
openssl genrsa -out config/jwt/private.pem -aes256 4096
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

When prompted, enter a passphrase for the private key. You'll need to add this to your `.env.local` file:

```dotenv
JWT_PASSPHRASE=your-passphrase
```

### Step 5: Create the Database Schema

Create the database schema and migrate the database using Doctrine:

```bash
php bin/console doctrine:schema:create
php bin/console doctrine:migrations:migrate
```

Or using the Symfony CLI:

```bash
symfony console doctrine:schema:create
symfony console doctrine:migrations:migrate
```

### Step 6: Start the Server

Start the Symfony server, assuming you're using the Symfony CLI:

```bash
symfony server:start
```

Otherwise, use a local web server of your choice.

### Step 7: Other environment variables

The following environment variables are optional:

```dotenv
MAILER_DSN=smtp://user:password@host:port
MAILER_FROM_ADDRESS=your-email-address
MAILER_FROM_NAME=your-name
```

You will also need to update `.env.local` with AWS S3 credentials for user avatar uploads and photos to be uploaded to the S3 bucket provided by the task. 

Locally, testing was done using [minio](https://min.io/), an open-source S3-compatible object storage server. You can use minio to test the API locally, or you can use the S3 bucket provided by the task.

```dotenv
AWS_S3_BUCKET="bucket-name"
AWS_S3_REGION="bucket-region"
AWS_KEY=""
AWS_SECRET=""
```

### Step 8: Send the Daily Newsletter

To send the daily newsletter, run the following command:

```bash
php bin/console app:send-daily-newsletter
```

Or using the Symfony CLI:

```bash
symfony console app:send-daily-newsletter
```

If you already have `crontab`, you can add the command to your crontab file to run it automatically every day at 6 p.m. For example:

```bash
0 18 * * * php /path/to/your/project/bin/console app:send-daily-newsletter
```

Since Symfony doesn't have a built-in cron scheduler, I've left this part of the task up to the web server configuration this API would run on.

### Step 9: Run the Tests

To run the tests, use PHPUnit:

```bash
php bin/phpunit
```

Or using the Symfony CLI:

```bash
symfony php bin/phpunit
```

## Credits

- [Symfony](https://symfony.com/)
- [Doctrine](https://www.doctrine-project.org/)
- LexikJWTAuthenticationBundle
- [Wessam Ahmed](mailto:wessam.ah@outlook.com)




