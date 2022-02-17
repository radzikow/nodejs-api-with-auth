# Goals API Service with Users JWT auth

<br>

# Project description

This project has only an educational purpose.

The service consists of endpoints for logging in and user registration, which also generate jwt (Json Web Tokens) and several CRUD endpoints for user goals. Only authorized users can call goals endpoints and each goal is assigned to a specific user.

Service uses MongoDB as a database for storing users and goals.

## Technology stack

- Node.js
- Express.js
- MongoDB (database)

<br>

# Available endpoints

## Auth endpoints:

1. `POST /api/users/register`
   - Should register a new user and return user data with token.
2. `GET /api/users/login`
   - Should login a user and return user data with token.

## Goals endpoints:

1. `POST /api/goals`
   - Should create a new goal and insert it to a db.
2. `GET /api/goals`
   - Should get all the goals for a db.
3. `PUT /api/goals/:id`
   - Should update a goal (based on a goal id) in a db.
4. `DELETE /api/goals/:id`
   - Should delete a goal (based on a goal id) from a db.

<br>

# Running project locally

Goals API Service code is located under `./backend` directory.

## Prerequisites

You need to have Node.js installed on your machine.

You need to have a [MongoDB account](https://www.mongodb.com/) with the database created. Database will have two collections: `users` and `goals`.

You can install [MongoDB Compass](https://www.mongodb.com/products/compass) on your local machine to view the database collections and documents. You can still do the same in your [MongoDB account](https://account.mongodb.com/account/login).


## Running project

1. Fetch this repository.

2. Open terminal and go to a root directory.

3. Run the following command from a root dir:
```
npm install
```

4. Create .env file in a root directory and copy content from .env.example to it. You can do it by running a command:
```
cp .env.example .env
```

5. Fill the .env file with
    - NODE_ENV
    - PORT
    - MONGO_URI
    - JWT_SECRET


6. Run the following command to start a Service:
```
npm start
```

7. (optional) Run the following command to start a Service in a watch mode:
```
npm run server
```

Service will run on: `localhost:5000`. Port 5000 is a default one but you can change it in .env file.

If you change .env file you need to restart the Service (stop Service by clicking **Ctrl + C** and run it again).

<br>

# Testing endpoints

To test endpoints you can use applications like [Postman](https://www.postman.com/).
