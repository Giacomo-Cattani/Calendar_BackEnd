# Calendar Backend

## Project Description
This project is a backend service for a calendar application. It provides APIs to manage events, users, and notifications. The backend is built using Node.js and Express, and it uses MongoDB for data storage.

## Installation
To install and run the project locally, follow these steps:

1. Clone the repository:\
   `git clone https://github.com/yourusername/Calendar_BackEnd.git
   cd Calendar_BackEnd`

2. Install the dependencies:\
   `npm install`

3. Create a `.env` file in the root directory and add your environment variables:\
 `JWT_SECRET=your_jwt_secret`

### Running the Application

To start the application in development mode, run:\
   `npm run dev`

To start the application in production mode, run:\
   `npm start`

The application will be available at `http://localhost:3000`.

## Project Structure

- `app.js`: Main application file where the Express app is configured.
- `bin/www`: Script for starting the server.
- `routes/`: Directory containing route handlers.
  - `login.js`: Route handler for login and fetching calendar events.
  - `marks.js`: Route handler for marks.
- `views/`: Directory containing Pug templates for rendering HTML.
  - `error.pug`: Template for error pages.
  - `index.pug`: Template for the index page.
  - `layout.pug`: Template for the layout.
- `public/stylesheets/`: Directory containing CSS files.
- `vercel.json`: Configuration file for deploying to Vercel.

## API Endpoints

### Login

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates the user and fetches calendar events.
- **Request Body**:
  >{\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"data": {\
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user": "username",\
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pwd": "password",\
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fromDate": "YYYY-MM-DD",\
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"toDate": "YYYY-MM-DD"\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\
  }
- **Response**:
  >{\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"token": "jwt_token",\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"events": [\
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{\
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"StartTime": "YYYY-MM-DD",\
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"EndTime": "YYYY-MM-DD",\
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Modulo": "module_name"\
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} ]\
  }

### Marks

- **URL**: `/marks`
- **Method**: `GET`
- **Description**: Fetches marks.
- **Response**:
    `WIP`


## Deployment

This project is configured to be deployed on Vercel. The `vercel.json` file contains the necessary configuration.

## License

This project is licensed under the MIT License.