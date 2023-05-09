# drivent-front

Front-end for Driven.t, an event management solution.

## About

Driven.t is a web browser application with which you can manage every single aspect of your event.

<details>
    <summary>Sign up</summary>

<img src="./src/assets/images/signup.png" alt="My project structure">
</details>

<details>
    <summary>Login</summary>

<img src="./src/assets/images/signin.png" alt="My project structure">
</details>

<details>
    <summary>Payment</summary>

<img src="./src/assets/images/payment.gif" alt="My project structure">
</details>

<details>
    <summary>Booking</summary>

<img src="./src/assets/images/hotel.gif" alt="My project structure">
</details>

<details>
    <summary>Activities</summary>

<img src="./src/assets/images/activities.gif" alt="My project structure">
</details>

## Technologies
Some of the main technologies used in this project.<br/><br/>
Front-end:<br/>
<div>
    <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" height="22px"/>
    <img src="https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational" height="22px" />
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="22px" />
    <img src="https://img.shields.io/badge/react-app%20-%2320232a.svg?&style=for-the-badge&color=60ddf9&logo=react&logoColor=%2361DAFB" height="22px" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="22px" />
</div>

<br/>Back-end:<br/>
<div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="22px"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="22px" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" height="22px" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="22px" />
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="22px" />
</div>


## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `REACT_APP_API_BASE_URL` should point to your API server (driven.t-back)

4. Run the back-end in a development environment:

```bash
npm start
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running application locally or inside docker

`.env.development` and `.env.test` must be changed if you and to run the application locally or inside docker. You can populate files based on `.env.example` file, but you need to consider the following:

- Running application locally (postgres and node):

Add your postgres credentials and make sure to create given database before running the application.

- Running application inside docker (postgres and node):

Set `POSTGRES_HOST` to `drivent-postgres-development` for `.env.development` and `drivent-postgres-test` for `.env.test` file. It is the name of the postgres container inside docker-compose file. Docker Compose will start the postgres container for you, create the database and host alias for you.

- Running application locally (node) but postgres is running inside docker:

Set `POSTGRES_HOST` to `localhost` for `.env.development` and `localhost` for `.env.test` file. Docker compose is configured to expose postgres container to your localhost.

## What to do when add new ENV VARIABLES

Please notice that every ENV that should be available on browser should start with `REACT_APP_` prefix. There are several things you need to do when you add new ENV VARIABLES:

- Add them to `.env.example` file
- Add them to your local `.env` file
- Add them to your docker-compose.yml file (just the name, not the value). Only envs listed in the environment section will be exposed to your docker container.
- Add them (prod version) to your github repo secrets. They will be used to generate the `.env` file on deploy.
