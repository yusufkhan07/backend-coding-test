# Backend Coding Test

## Test 1

- Fork and clone this project locally then begin the test in the repo.
- Develop a backend system using the [NestJS](https://nestjs.com/) and [Serverless](https://serverless.com/) framework that will be deployed on [AWS Lambda](https://aws.amazon.com/lambda/) following the serverless architecture and the microservice principles of NestJS. The database used will be PostgreSQL and interactions with the DB will be through [TypeORM](https://github.com/typeorm/typeorm).
- The backend should provide services that will allow the creation of a user profile on sign up that consist of `name` and `date of birth` which would authenticate with firebase authentication using the [firebase admin library](https://firebase.google.com/docs/admin/setup). Profile data should be stored on a PostgreSQL instance.
- Setup a middleware that validates firebase auth token for each request.
- Setup all other middleware that would commonly be used.
- Create a blog service that allows the creation and management of blog articles which will be stored both on the PostgreSQL instance and on a Firebase firestore instance. All api routes of the blog service should be protected and only accessible through the admin role.
- A public api route should be provided that returns a paginated list of blog articles.
- Develop a CRON Job that will run once a day and will add a random word to the end of each blog title.
- Deploy all work as instructed.

## Extra Points

- Generate an [OpenAPI](https://swagger.io/specification/) documentation for all routes

## Good Job!

After completing the coding test, please provide the details listed below:

- API route links and Open API documentation
- Public github link for all test completed
- Any other information required to run and access the project such as environment keys (`.env`) and admin login

## Learn More

To learn more about some of the technologies used, take a look at the following resources:

- [Nest.js Documentation](https://docs.nestjs.com/)
- [Dayjs](https://day.js.org/)
- [Serverless](https://www.serverless.com/framework/docs/)
- [AWS Lambda](https://aws.amazon.com/lambda/getting-started/)
- [PostgreSQL](https://www.postgresql.org/)
- [ElephantSQL](https://www.elephantsql.com/docs/index.html)

# Solution

## Setup environment variables

- make a copy of the file `.env.example` and name it `.env`
- fill the appropriate env variable values in the `.env` file


## Firebase Admin Setup

- Setup a firebase account.
- Generate a credentials JSON file and upload it to S3.
- Proivde the credentials JSON file url in `.env` file as a variable named `GOOGLE_APPLICATION_CREDENTIALS_S3_HTTPS_URL`

## Running Locally

- Install dependencies using `npm install`
- Run code using `npm run start`

## Deploying

- Setup AWS account and generate credentails. Make sure the user have appropriate permissions.
- Provide the credentails to serverless as instructed here: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
- Make sure the DB & Firebase credentials provided in the `.env` file are accessable from your AWS server.
- Deploy using `sls deploy -v`

## Getting Auth Token

We're using firebase Authentication and tokens can be generated on the frontend only. Firebase-admin doesn't have the abilitiy to generate token. For testing purposes, I have created a html/js client and hosted it on s3 at the following URL: https://stayr-static.s3.us-east-2.amazonaws.com/test.html. 

You can use this to generate auth tokens using email and password. Plase note that this html client uses my firebase credentials. You'll probably need to replicate this HTML page, add your own firebase credentials and then generate access token.


## Cron

Nestjs provides a Cron Module but it can't be used because we're using serverless design pattern.

We have to create a CloudWatch cron job which will call an SNS topic once a day.

The SNS will then call our REST API endpoint which is responsible for executing the task we need.

I've added an endpoint `/blogs/randomize-titles` which the SNS will call. This endpoint is responsible for add random words in the title.

## Improvements

 - Use Migrations instead of the 'synchronize: true' option TypeOrm Configuration.

## Deployment

I've deployed the code using serverless and the swagger docs can be accessed at `https://wnhvetxjsk.execute-api.us-east-1.amazonaws.com/dev/api/#/`

When running the code locally, make sure the select the appropriate `server` in the `servers` dropdown in the swagger ui.
 