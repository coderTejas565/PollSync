# PollSync — Real-Time Polling & Feedback Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white)
![Deployed](https://img.shields.io/badge/deployed-live-brightgreen)

PollSync is a full-stack polling platform for creating, sharing, and analyzing feedback in real time.

Users can create polls with multiple questions, define response rules (anonymous or authenticated), set expiry times, collect responses through public links, monitor live analytics, and publish final results after polling ends.

**Live Application:**
- Frontend: [poll-sync-tau.vercel.app](https://poll-sync-tau.vercel.app)
- Backend API: [pollsync-backend.onrender.com](https://pollsync-backend.onrender.com)

---

## Problem Statement

Collecting structured feedback usually requires stitching together multiple tools — form builders, analytics dashboards, auth systems, and sharing mechanisms. PollSync combines these into one product:

```text
Create Poll → Share Public Link → Collect Responses → Monitor Live Analytics → Publish Results → Public Viewing
```

---

## Core Features

### Authentication & Authorization

- User registration and login
- JWT with access token + refresh token flow
- Secure cookie handling
- Ownership-based authorization (only poll creators can manage their polls)
- Protected routes

### Poll Creation System

Users can create polls with multiple questions, optional/required fields, anonymous or authenticated response modes, and expiry dates.

```json
{
  "title": "Favorite Runtime",
  "questions": [
    {
      "text": "Choose one",
      "required": true,
      "options": ["Node.js", "Go", "Python"]
    }
  ]
}
```

### Public Poll Sharing

Every poll gets a public URL at `/poll/:slug`. Respondents can open the link, submit responses, and view final published results.

### Response Validation

- Required questions enforced
- Invalid options rejected
- Duplicate submissions blocked
- Expired or published polls cannot accept new responses

### Real-Time Analytics

Socket.IO powers a live dashboard that updates total response counts and question-level breakdowns without any page refresh.

```json
{
  "totalResponses": 52,
  "questions": [
    {
      "question": "Favorite Runtime",
      "options": [{ "text": "Node.js", "count": 30 }]
    }
  ]
}
```

### Poll Lifecycle

```text
Draft → Active → Collecting Responses → Real-Time Analytics → Publish → Voting Closed → Public Results
```

Once published, voting stops automatically and final results become publicly accessible.

---

## System Architecture

```text
React + Vite
      ↓
Axios Requests
      ↓
Express API
      ↓
Authentication Middleware
      ↓
Business Logic Layer
      ↓
Prisma ORM
      ↓
PostgreSQL
      ↓
Socket.IO Events
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router, Axios, React Hook Form, TailwindCSS, Socket.IO Client |
| Backend | Node.js, Express.js, Prisma ORM, PostgreSQL, JWT, Zod, Socket.IO |
| Deployment | Vercel (frontend), Render (backend), Neon PostgreSQL (database) |

---

## Project Structure

```bash
PollSync/
├── client/
│   └── src/
│       ├── api/
│       ├── pages/
│       ├── components/
│       ├── routes/
│       ├── hooks/
│       └── utils/
└── server/
    ├── prisma/
    └── src/
        ├── modules/
        │   ├── auth/
        │   ├── poll/
        │   ├── response/
        │   ├── analytics/
        │   └── socket/
        ├── middleware/
        ├── common/
        └── config/
```

---

## API Reference

**Auth**
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
```

**Polls**
```
POST   /api/polls
GET    /api/polls/me
GET    /api/polls/:slug
PATCH  /api/polls/:id/publish
DELETE /api/polls/:id
```

**Responses**
```
POST /api/responses/:pollId
```

**Analytics**
```
GET /api/polls/:id/analytics
```

---

## Socket Events

| Event | Description |
|---|---|
| `join-poll` | Subscribe to a poll room |
| `new-response` | Fired when a response is submitted |
| `analytics-updated` | Triggers dashboard refresh |
| `poll-published` | Notifies when poll is closed |

---

## Local Development Setup

**Clone the repository:**
```bash
git clone https://github.com/coderTejas565/PollSync.git
```

**Install dependencies:**
```bash
# Backend
cd server && pnpm install

# Frontend
cd client && pnpm install
```

**Set up environment variables:**

Backend (`.env`):
```env
PORT=
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=
PRODUCTION_CLIENT_URL=
```

Frontend (`.env`):
```env
VITE_API_URL=
```

**Run database migrations:**
```bash
pnpm prisma migrate dev
pnpm prisma generate
```

**Start development servers:**
```bash
# Backend
cd server && pnpm dev

# Frontend
cd client && pnpm dev
```

---

## Key Challenges

Building PollSync involved solving some non-trivial backend problems: implementing a secure refresh token rotation flow with httpOnly cookies, handling cross-origin auth between a Vercel frontend and Render backend, designing a Prisma schema that supports flexible poll structures, and integrating Socket.IO rooms to push analytics updates to the right clients in real time.

---

## Author

**Tejas** - Backend developer (Node.js, Express, PostgreSQL)

- GitHub: [@coderTejas565](https://github.com/coderTejas565)
- LinkedIn: [tejas-null-5174b0399](https://www.linkedin.com/in/tejas-null-5174b0399/)
- X: [@TEJAS_DEV_code](https://x.com/TEJAS_DEV_code)

---

Suggestions and contributions are welcome.