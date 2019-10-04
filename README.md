# Phonebook Rest API


Rest api for phonebook


## Requirements

 - [Node v10>=](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone --depth 1 https://github.com/osamabari/rest_api
cd rest_api
```

#### Install dependencies:

```bash
yarn
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```
and open http://localhost:3000/v1/status to check api is running or not 

## Running Documenation

Step 1: 

```bash
yarn docs
```

Step2: 
```bash
yarn dev
```
Step3: 

open http://localhost:3000/v1/docs in web browser

## Check API In Postma

Import Phonebook_API.postman_collection.json file in postman to start



## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix
```

## Test

```bash
# run all tests with Mocha
yarn test
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev

# run container in production
yarn docker:prod

# run tests
yarn docker:test
```

## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
yarn deploy
```

