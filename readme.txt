FinPilot - Project Summary

Frontend:
- Framework: React (v19) + TypeScript
- Bundler: Vite
- Styling: Tailwind CSS
- UI / Animations: Framer Motion, Radix UI primitives
- Icons / Charts: lucide-react, recharts
- Routing: react-router-dom
- Key packages listed in package.json

Backend:
- None included in this repository. This is a frontend-only application. No server code or API routes are present.

Database:
- None included. The app uses mocked data (see src/data/mockData.ts) and keeps state in React context (src/lib/financeStore.tsx).

Data & State:
- Mock data: src/data/mockData.ts (transactions, budgets, goals, notifications, predictions).
- State management: src/lib/financeStore.tsx (React Context + useState/useCallback). No external DB or persistence.

Main folders / important files:
- src/pages: route views and pages (LandingPage, DashboardPage, SettingsPage, etc.)
- src/components/layout: global layout components (TopBar, Sidebar, AppLayout)
- src/components/dashboard: dashboard widgets and charts
- src/components/ui: UI primitives (GlassCard, GlowButton, Modal, etc.)
- src/lib/financeStore.tsx: central finance state and actions
- src/data/mockData.ts: mocked dataset used throughout the app
- package.json: lists project dependencies and npm scripts

What I changed (name replacement):
- Replaced visible occurrences of the name "Rahul" / specific testimonials with "obalesh K R".
- Files modified:
  - src/pages/SettingsPage.tsx
  - src/pages/DashboardPage.tsx
  - src/pages/LandingPage.tsx
  - src/components/layout/TopBar.tsx

Run locally (quick):
1) Install dependencies
   npm install
2) Start dev server
   npm run dev

Notes / next steps:
- If you want backend integration, pick an API and DB (e.g., Node/Express + Postgres, or Supabase/Firebase) and replace mockData with real API calls.
- If you want me to also update emails/avatars or change capitalization of the display name, tell me and I will apply those edits.

Generated on: 2026-05-18
