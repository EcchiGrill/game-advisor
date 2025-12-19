# 🎨 Game Advisor Web Application

> 🚀 _Frontend application for the Game Advisor platform - AI-driven game discovery with natural language search._

AI-powered game discovery platform that helps users find the right game faster, with less scrolling and more playing. Built with Next.js, React, and GraphQL.

---

## ✨ Features

### 🤖 AI Advisor

- **Natural Language Game Discovery**: Describe what kind of game you want to play, and the AI will recommend the perfect match
- **Multiple AI Models**: Choose between GPT-4.1-mini and Gemini 2.5 Flash
- **Interactive Game Selection**: Skip, ban, or choose recommended games
- **Personalized Preferences**: Save chosen and banned games to your profile for better future recommendations
- **Animated Background**: Immersive 3D animated background using Three.js

### 🎮 Game Catalog

- **Advanced Search**: Full-text search across game titles and descriptions
- **Comprehensive Filtering**:
  - Rating range (1-5 stars)
  - Metacritic score (0-100)
  - Playtime range (0-500 hours)
  - Release date range with calendar picker
  - Multiple genre selection with search
  - Multiple platform selection with search
- **Sorting Options**: Sort by various criteria (rating, release date, popularity, etc.)
- **Pagination**: Efficient pagination for browsing large game collections
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👤 Authentication & User Management

- **User Registration**: Sign up with email and password
- **Email Confirmation**: Secure email verification flow
- **Password Recovery**: Forgot password and reset password functionality
- **Session Management**: JWT-based authentication with NextAuth.js
- **User Profiles**: View and manage user preferences, chosen games, and banned games

### 🎨 User Interface

- **Modern Design**: Clean, dark-themed interface with smooth animations
- **Component Library**: Comprehensive UI component system built on Radix UI
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: WCAG-compliant components with proper ARIA labels
- **Toast Notifications**: User-friendly feedback for actions and errors

---

## 🧰 Technology Stack

### Core Framework

- 🧱 **Next.js 16.0.7** – React framework with App Router
- ⚛️ **React 19.2.0** – UI library
- 📘 **TypeScript** – Type-safe development

### State Management & Data Fetching

- 🔷 **Apollo Client 4.0.11** – GraphQL client for API communication
- 📝 **React Hook Form 7.66.0** – Form state management
- ✅ **Zod 4.1.12** – Schema validation

### Authentication

- 🔐 **NextAuth.js 4.24.13** – Authentication and session management
- 🔑 **JWT** – Token-based authentication

### UI Components & Styling

- 🎨 **Radix UI** – Accessible component primitives
  - Accordion, Avatar, Checkbox, Label, Popover
  - Select, Slider, Tabs, Tooltip
- 🎭 **Tailwind CSS 3.4.1** – Utility-first CSS framework
- ✨ **Framer Motion 12.23.26** – Animation library
- 🎯 **Lucide React** – Icon library
- 🔖 **React Icons** – Additional icon set

### Additional Libraries

- 🎬 **Three.js 0.181.1** – 3D graphics for animated background
- 🔔 **react-toastify 11.0.5** – Toast notifications

### Development Tools

- 🔍 **ESLint** – Code linting
- 🧪 **Jest** – Testing framework
- 🧩 **Testing Library** – Component testing utilities
- 📋 **TypeScript ESLint** – TypeScript-specific linting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Access to the Game Advisor API backend
- Environment variables configured

### Installation & Development

1. Navigate to the web app directory:

```bash
cd apps/web
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables (if needed):
   Create a `.env.local` file with necessary environment variables for API endpoints, authentication, etc.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Key Features Implementation

### 🤖 AI Advisor

The AI Advisor component (`src/components/AIAdvisor/AIAdvisor.tsx`) provides an interactive interface for game recommendations:

- Users enter a natural language prompt describing their desired gaming experience
- The system queries the backend GraphQL API with the prompt and excluded games
- Results are displayed in an animated GameCard with options to:
  - **Skip**: Get another recommendation
  - **Ban**: Permanently exclude from future recommendations (requires authentication)
  - **Choose**: Save to user's chosen games list

### 🎮 Game Catalog

The catalog page (`src/app/catalog/page.tsx`) offers comprehensive game browsing:

- **Search**: Real-time search across game database
- **Filters**: Multi-criteria filtering with collapsible sidebar
- **Sorting**: Multiple sorting options (rating, date, popularity)
- **Pagination**: Efficient page-based navigation
- **Game Cards**: Rich game information display with images, ratings, genres, and platforms

---

## 🧪 Testing

The project includes Jest and React Testing Library for testing:

- Component unit tests
- Utility function tests
- Test files are co-located with components (e.g., `button.test.tsx`)

Run tests with:

```bash
npm run test
```

---

## 🌐 API Integration

The application communicates with the Game Advisor API through GraphQL:

- Apollo Client is configured in `libs/network/ApolloProvider.tsx`
- GraphQL queries and mutations are generated from `.gql` files
- Authentication tokens are managed through the TokenProvider
- Server-side Apollo Client is used for SSR/SSG
