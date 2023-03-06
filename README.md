# Music Library App

This is a web application designed to manage a music library. The app is built using JavaScript with Express framework, Docker for containerization, pgAdmin 4 for database management, and Mocha for testing.

## Table of Contents

- Technologies
- Setup
- Features
- Endpoints
- Tests
- Contributors
  <br>

## Technologies

The app is built using the following technologies:

JavaScript /
Express /
Docker /
pgAdmin 4 /
Mocha /

<br>

# Set Up

To run the app, first clone the repository to your local machine. Install any necessary dependencies and run the app with the command `npm start`. Access the app in your web browser at [http://localhost:3000/](https://).

## Features

User can view music library artists and albums
User can add new artists to the library
User can add new albums to the library
User can update artist details
user can update album details
user can delete artists
user can delete albums

This is a basic version of the app and will be updated with more features and functionality in the future.

| Method | Endpoint                  | Description                                       |
| ------ | ------------------------- | ------------------------------------------------- |
| GET    | /                         | Get list of available endpoints                   |
| GET    | /artists                  | Get list of all artists                           |
| POST   | /artists                  | Add a new artist to the library                   |
| GET    | /artists/:artistId        | Get a single artist by ID                         |
| PATCH  | /artists/:artistId        | Update an existing artist by ID                   |
| DELETE | /artists/:artistId        | Delete an artist by ID                            |
| GET    | /artists/:artistId/albums | Get a list of albums by a specific artist         |
| POST   | /artists/:artistId/albums | Add a new album to a specific artist's collection |
| GET    | /albums                   | Get list of all albums                            |
| GET    | /albums/:albumId          | Get a single album by ID                          |
| PATCH  | /albums/:albumId          | Update an existing album by ID                    |
| DELETE | /albums/:albumId          | Delete an album by ID                             |

## Tests

You can run the test suite using the following command:

`npm test`

This will run the unit tests defined in the test directory using Mocha and Chai. The tests cover the basic functionality of the API and should give you an idea of how to interact with it.

## Contributors:

**- Chris Edwards:** [https://github.com/CodeChris96](https://)

<!-- **- Code reviewed by:** Hey code reviewer! Go on... add your name here! -->

Feel free to fork the repository and contribute to the project.
