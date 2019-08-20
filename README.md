# PAYSTACK WARS

Paystack Star Wars

* [Installation](#installation)
* [Starting App](#starting-app)
* [Docker](#docker)

## Installation

These instructions are for use without docker

* Clone the repository [https://github.com/hackthievist/star-wars-movies.git](https://github.com/hackthievist/star-wars-movies.git)
* Make sure that [Node.js](https://nodejs.org/) is installed.
* Install Node.js modules with `yarn` [YarnPKG](https://yarnpkg.com/):
  
```shell
yarn install
```

## Documentation

* The API documentation with Postman can be found [here](https://documenter.getpostman.com/view/2585442/SVfJTrDw?version=latest)

## Starting App

* To run the app, copy the file `.env.example` to `.env` and substitute the settings to match your development environment.
* Make sure `postgres` is installed and running if you plan on using the app locally.
* Start the app with `yarn`:

```shell
yarn start
```

* Navigate to [localhost:1400](http://localhost:1400). Please note `1400` is the default port used, you can change this in `.env`.
`

## Docker

### Using Docker Standalone - Compose (Recomended for local development)

* Copy the files `docker-config/secrets.env.example`, `docker-config/config.env.example` to `docker-config/secrets.env`, `docker-config/config.env` and substitute the settings to match your development environment.

Make sure postgres is installed locally by running `psql`

```shell
docker-compose up -d
```

* see logs
  
```shell
docker-compose logs -f
```

* tear down
  
```shell
docker-compose down
```

## Visit App

* Navigate to [https://paystack-wars.herokuapp.com](https://paystack-wars.herokuapp.com) or [http://localhost:1400](http://localhost:1400)(docker standalone)

## Stack

* Backend Language + Framework: Nodejs + Sails.js
* Database: PostgreSQL
* Hosting Server: Heroku
* Container Platform: Docker
