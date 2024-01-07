# Book Management System

Welcome to the Book Management System! This system provides an efficient way to manage books digitally, with user-friendly interfaces and a robust backend architecture. For more information and to use the system, visit the website:

[Book Management System](https://bms-frontend-hfm3.onrender.com/)

## Login Credentials

To access the system, use the following credentials:

- **Email**: johndoe@gmail.com
- **Password**: Abcdefgh@12

## Architecture Diagram

For a detailed view of the system's architecture, click the following link:

[Architecture Diagram](https://excalidraw.com/#json=-pNhHgKV-OSiRcmrMLQed,FWlN06Cd3woS2au4OTLA9A)

## Local Setup

If you want to try the system locally, follow these steps:

1. **Backend Setup**:
   - Add a `.env` file in the backend directory with the following content:
     ```
     MONGO_USERNAME = "<Your MongoDB Username>"
     MONGO_PASSWORD = "<Your MongoDB Password>"
     ```
   - Run the backend server using the command: `npm run start`
   - The backend will run at `http://localhost:3005`.

2. **Frontend Setup**:
   - Go to `/frontend/src/API/constants.js` and set `IS_TEST = true`.
   - Run the frontend using the command: `npm run start`.
   - The frontend will run at `http://localhost:3000`.
