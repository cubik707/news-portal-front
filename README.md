# News Portal — Frontend

A news portal frontend with a role-based access system, content moderation, and Markdown support.

---

## Tech Stack

| Category             | Technology                              |
| -------------------- | --------------------------------------- |
| Framework            | React 19 + TypeScript 5.7               |
| Build Tool           | Vite 6                                  |
| State / API          | Redux Toolkit + RTK Query               |
| Routing              | React Router DOM v7                     |
| UI Components        | Material UI (MUI) v7 + Emotion          |
| Styling              | Tailwind CSS v3, SASS                   |
| Forms                | React Hook Form + Yup                   |
| HTTP Client          | Axios                                   |
| Markdown             | React Markdown + React SimpleMDE Editor |
| Linting / Formatting | ESLint + Prettier                       |

---

## Features

### Authentication

- Registration and login with JWT tokens
- Protected routes (`ProtectedLayout`)
- Automatic logout on token expiration (401)

### News

- News feed on the main page
- Full news post page with comments
- Create and edit posts via Markdown editor
- Image upload
- Filtering by tags and categories
- News statuses: `draft`, `published`, `archived`

### Account Dashboard

| Section             | Description                                     |
| ------------------- | ----------------------------------------------- |
| Profile             | View user info, submit a role change request    |
| My Comments         | List of comments left by the user               |
| Drafts (Editor)     | List of unpublished posts by the editor         |
| Users (Admin)       | User management                                 |
| News Review (Admin) | List of news pending moderation                 |
| Amendments (Admin)  | Role change requests from users                 |
| News Detail (Admin) | Detailed review and decision on a specific post |

### User Roles

- `USER` — read news and leave comments
- `EDITOR` — create and manage own posts
- `ADMIN` — full access, moderation, user management

---

## Routes

```
/                                 — Main page (news feed)
/login                            — Login
/register                         — Register
/news/:id                         — Full news post
/news/:id/edit                    — Edit news post
/news/create                      — Create news post
/account/profile                  — User profile
/account/comments                 — My comments
/account/editor/drafted-news      — Drafts (Editor)
/account/admin/users              — User management (Admin)
/account/admin/news               — News moderation (Admin)
/account/admin/amendment          — Role change requests (Admin)
/account/admin/news/:id           — News review (Admin)
```

---

## Getting Started

### Requirements

- Node.js >= 18
- Running backend (default: `http://localhost:8080`)

### Installation and Launch

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# or create .env manually with the following content:
# VITE_API_BASE_URL=http://localhost:8080

# 3. Start the development server
npm run dev
```

The app will be available at: `http://localhost:5173`

### Other Commands

```bash
npm run build        # Production build
npm run preview      # Preview the production build
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

---

## Project Structure

```
src/
├── app/                    # Entry point, store, base API
├── assets/                 # Static assets
├── common/
│   ├── components/         # Reusable components (Header, Snackbar, etc.)
│   ├── context/            # React contexts (UserContext)
│   ├── enums/              # Shared enums
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Application pages
│   ├── router/             # Router and protected routes
│   ├── types/              # Shared types
│   └── utils/              # Utilities (date formatting, etc.)
└── features/               # Feature modules (auth, news, comments, tags, user, etc.)
    ├── auth/
    ├── category/
    ├── comments/
    ├── file-upload/
    ├── news/
    ├── tags/
    ├── user/
    └── userProfile/
```

---

## Environment Variables

| Variable            | Description          | Example                 |
| ------------------- | -------------------- | ----------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080` |
