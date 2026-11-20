# ApplyTrack – Job Application Tracker

ApplyTrack is a full-stack MERN application that helps users manage and track their job applications in one place.

## Features

- User Registration and Login
- JWT-based Authentication
- Add, Edit and Delete Job Applications
- Track Application Status
- Search Applications by Company, Role and Location
- Filter and Sort Applications
- Dashboard with Application Statistics
- Follow-up Reminders
- View Detailed Application Information
- User-specific Application Management

## Tech Stack

**Frontend**
- React.js
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```text
ApplyTrack/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
└── .gitignore
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nidhipandit12/ApplyTrack.git
cd ApplyTrack
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/applications | Get Applications |
| POST | /api/applications | Create Application |
| PUT | /api/applications/:id | Update Application |
| DELETE | /api/applications/:id | Delete Application |

## Security

- Passwords are hashed using bcryptjs.
- JWT is used for authentication.
- Protected routes require authentication.
- Application records are associated with individual users.
- Environment variables are excluded from Git.

## Author

Developed as a full-stack web development project.