## Overview
Ask.it is a React.js, Node.js, and PostgreSQL-based full-stack web application that allows users to ask and answer questions.

This repository contains backend implementation, which is deployed to [Heroku](https://ask-it-backend.herokuapp.com/)

Follow the steps below to get started with this project's development environment.
1. Download and install NodeJS from [https://nodejs.org/en/](https://nodejs.org/en/)
2. Download and install PostgreSQL from [https://www.postgresql.org/](https://www.postgresql.org/)
3. Clone this repository and navigate into it

## Setup
To run this project, open the cloned repository and follow these steps:
1. Navigate to the project folder and install dependencies with command
````
npm install or npm i
````
2. Create a PostgreSQL Database with command
````
sequelize db:create
````
3. Run the migrations with command
````
sequelize db:migrate
````
4. Run the seeds with command
````
sequelize db:seed:all
````
5. Launch the development server using the command
````
npm run dev
````
This should run the application in your browser at `localhost:8000`.

## Features
* The homepage is a public route that includes a search area for filtering questions, a list of the most recent questions, and a statistics section that shows who has the most responses and questions with most likes.
* My Questions is a private page that filters questions posted by the current logged-in user. Create, Edit, and Delete questions are all possible options for the user.
* The question page is a private route that displays all of the question's data as well as any relevant answers. A logged-in user can also Like/Dislike questions and answers, as well as Add/Edit/Delete responses.
* The profile page is a private route that displays the profile of the currently logged-in user. The user can amend personal information and change their password.
* Login page is a public route that allows users with accounts to log in.
* Register page is a public route that allows new users to register, contains form validation.
