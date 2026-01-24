# NAVI LMS - Online Learning Platform

A modern, clean MVP UI template for an online learning platform focused on teaching programming and Front-End development to kids and teenagers (age 10-17) in Uzbekistan.

## Features

- 🎨 **Apple-style UI Design** - Clean, minimal, and premium interface
- ✨ **Glassmorphism Effects** - Modern semi-transparent panels with backdrop blur
- 📱 **Fully Responsive** - Desktop-first design that adapts to tablet and mobile
- 🎯 **Learning Path** - Visual roadmap with progress tracking
- 📚 **Course Management** - Organized by blocks, months, and lessons
- 🎥 **Lesson Pages** - Video, theory, and task tabs
- 🔐 **Authentication UI** - Login page with validation

## Tech Stack

- **Next.js 14+** (App Router)
- **JavaScript** (no TypeScript)
- **Tailwind CSS**
- **shadcn/ui** components
- **lucide-react** icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
navi-lms/
├── app/
│   ├── login/              # Login page
│   └── (app)/              # Authenticated routes
│       ├── courses/        # Courses dashboard
│       ├── courses/month/  # Month detail pages
│       └── lesson/         # Lesson pages
├── components/
│   ├── layout/             # AppShell, Sidebar, Topbar
│   ├── courses/            # Course-related components
│   ├── month/              # Month roadmap components
│   ├── lesson/             # Lesson tab components
│   └── ui/                 # shadcn/ui components
├── data/
│   └── fakeLms.js          # Mock data
└── lib/
    └── utils.js            # Utility functions
```

## Routes

- `/login` - Login page
- `/courses` - Courses dashboard
- `/courses/month/[monthId]` - Month detail with lesson roadmap
- `/lesson/[lessonId]?tab=video|theory|task` - Lesson page with tabs

## Design System

- **Primary Color**: `#0042FF`
- **Background**: White
- **Glassmorphism**: Semi-transparent white panels with backdrop blur
- **Typography**: Clean, readable fonts
- **Spacing**: Generous padding and margins

## Mock Data

All data is currently mocked in `data/fakeLms.js`. The structure is backend-friendly and ready to be connected to a real API.

## Notes

- This is an MVP with mocked data
- Backend integration is not implemented
- All authentication is UI-only
- Video player is a placeholder
- Ready for backend connection

## License

MIT
