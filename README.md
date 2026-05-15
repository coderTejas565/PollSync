# PollSync — Real-Time Polling & Feedback Platform

PollSync is a full-stack polling platform designed for creating, sharing, collecting, and analyzing feedback in real time.

Users can create polls with multiple questions, define response rules (anonymous or authenticated), set expiry times, collect responses through public links, monitor live analytics, and publish final results after polling ends.

The platform focuses on complete product workflows including authentication, authorization, dynamic forms, real-time updates, analytics computation, and production deployment.

Live Application:

Frontend: https://poll-sync-tau.vercel.app

Backend API:

https://pollsync-backend.onrender.com

---

## Problem Statement

Collecting structured feedback usually requires multiple tools:

- Form builders
- Analytics dashboards
- Authentication systems
- Public sharing mechanisms
- Result publishing systems

PollSync combines these workflows into one product:

```text
Create Poll
      ↓
Share Public Link
      ↓
Collect Responses
      ↓
Monitor Live Analytics
      ↓
Publish Final Results
      ↓
Public Result Viewing
```

---

# Core Features

## Authentication & Authorization

Implemented secure authentication workflows:

- User registration
- Login system
- JWT authentication
- Access token + refresh token flow
- Protected routes
- Ownership-based authorization
- Secure cookie handling

Only poll creators can:

- Access analytics
- Publish results
- Delete polls
- Manage poll lifecycle

---

## Poll Creation System

Users can create polls with:

- Multiple questions
- Single-option responses
- Required questions
- Optional questions
- Anonymous response mode
- Authenticated response mode
- Poll expiry dates

Example structure:

```json
{
  "title": "Favorite Runtime",

  "questions": [
    {
      "text": "Choose one",
      "required": true,

      "options": [
        "Node.js",
        "Go",
        "Python"
      ]
    }
  ]
}
```

---

## Public Poll Sharing

Every poll generates a public URL:

```text
/poll/:slug
```

Respondents can:

- Open poll links
- Submit responses
- View final published results

---

## Response Validation

Backend validation ensures:

- Required questions are answered
- Invalid options are rejected
- Duplicate submissions are prevented
- Expired polls cannot accept responses
- Published polls cannot accept new submissions

---

## Real-Time Analytics

Socket.IO powers live updates:

Live dashboard updates include:

- Total response counts
- Analytics refresh
- Participation changes

No page refresh required.

---

## Analytics Dashboard

Poll creators receive analytics including:

- Total responses
- Question-level summaries
- Option selection counts
- Participation insights

Example:

```json
{
  "totalResponses": 52,

  "questions": [
    {
      "question": "Favorite Runtime",

      "options": [
        {
          "text": "Node.js",
          "count": 30
        }
      ]
    }
  ]
}
```

---

## Poll Publishing Workflow

Implemented complete poll lifecycle:

```text
Draft
↓
Active Poll
↓
Collect Responses
↓
Real-Time Analytics
↓
Publish Results
↓
Voting Closed
↓
Public Results Available
```

Once published:

- Voting stops automatically
- Responses are blocked
- Final results become public

---

# System Architecture

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

# Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- React Hook Form
- TailwindCSS
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- Zod
- Cookie Parser
- Socket.IO

---

## Deployment

Frontend:

Vercel

Backend:

Render

Database:

Neon PostgreSQL

---

# Project Structure

```bash
PulseBoard/

├── client/
│
│   ├── src/
│   │
│   ├── api/
│   ├── pages/
│   ├── components/
│   ├── routes/
│   ├── hooks/
│   └── utils/
│
├── server/
│
│   ├── prisma/
│
│   ├── src/
│   │
│   ├── modules/
│   │
│   │    ├── auth/
│   │    ├── poll/
│   │    ├── response/
│   │    ├── analytics/
│   │    └── socket/
│   │
│   ├── middleware/
│   ├── common/
│   └── config/
│
└── README.md
```

---

# API Highlights

Authentication:

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
```

Polls:

```text
POST /api/polls
GET /api/polls/me
GET /api/polls/:slug
PATCH /api/polls/:id/publish
DELETE /api/polls/:id
```

Responses:

```text
POST /api/responses/:pollId
```

Analytics:

```text
GET /api/polls/:id/analytics
```

---

# Environment Variables

Backend:

```env
PORT=

DATABASE_URL=

JWT_SECRET=

CLIENT_URL=

PRODUCTION_CLIENT_URL=
```

Frontend:

```env
VITE_API_URL=
```

---

# Local Development Setup

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

Backend:

```bash
cd server
pnpm install
```

Frontend:

```bash
cd client
pnpm install
```

Run backend:

```bash
pnpm dev
```

Run frontend:

```bash
pnpm dev
```

---

# Database Setup

Apply migrations:

```bash
pnpm prisma migrate dev
```

Generate Prisma client:

```bash
pnpm prisma generate
```

---

# Real-Time Events

Socket events:

```text
join-poll

new-response

analytics-updated

poll-published
```

---

# Production Challenges Solved

This project involved solving:

- Cross-origin authentication
- JWT + refresh token workflows
- Secure cookie handling
- Dynamic form systems
- Prisma schema design
- Real-time communication
- Analytics computation
- Poll lifecycle management
- Production deployment
- Socket.IO integration
- CORS handling
- Route rewriting for deployment

---

# Screenshots

Add screenshots for:

1. Dashboard
2. Poll creation
3. Public poll page
4. Analytics dashboard
5. Published results page

A short demo GIF significantly improves project presentation.

---

# Key Learnings

Building PulseBoard required understanding:

- Backend architecture patterns
- Database schema relationships
- Authentication systems
- Authorization layers
- Real-time systems
- API design
- Deployment workflows
- Full-stack integration
- Product lifecycle thinking

---

# Author

Tejas

Backend-focused developer passionate about GenAI, aiming to master system design and grow into a complete full-stack engineer.

GitHub:

<https://github.com/coderTejas565>

LinkedIn:

<https://www.linkedin.com/in/tejas-null-5174b0399/>

X:

@TEJAS_DEV_code

---

# Feedback

Suggestions, improvements, and contributions are welcome.