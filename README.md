# 🎮 Game Advisor

> 🚀 _AI-powered assistant that helps you find the right game faster, with less scrolling and more playing._

Game Advisor is an AI tool designed to simplify the game discovery process.
Instead of endless filters and store tabs, you describe what you feel like playing in natural language, and the app does the rest:

- “I want a story-rich RPG with turn-based combat, similar to Divinity, but shorter.”
- “Co-op games for 3 friends on PC, low system requirements.”
- “Something cozy for evenings, no horror, strong narrative.”

Game Advisor normalizes your prompt with AI into structured search criteria, queries external game databases, and ranks results based on your tastes, history and favorites.

---

## ✨ Core Features

- 🎯 **Natural language search** – Type what you want to play, not how the filters are named.
- 🧠 **AI prompt normalization** – Google AI/OpenAI turns messy text into structured constraints.
- 📚 **Multi-source game catalog** – Aggregates data from RAWG.io API to maximize coverage and metadata quality.
- 🧪 **Smart ranking & scoring** – Combines AI + metadata + user preferences to surface the most relevant picks.
- ❤️ **User accounts & collections** – Save favorites, completed games, chosen games, and banned games.
- 🧬 **Personalized suggestions** – Uses user preferences, favorites, and gaming history to refine recommendations.
- 🗂️ **Game library & management** – Mark games as favorite, completed, chosen, or banned to tune recommendations.
- 🔐 **Authentication & security** – JWT-based auth with email confirmation and password reset.
- 📧 **Email services** – Automated email confirmation and password reset functionality.
- 📊 **Semantic search** – PostgreSQL with pgvector for AI-powered game discovery.
- 🌐 **Dual API support** – REST API for simplicity + GraphQL for flexibility.
- 📈 **Feedback system** – User feedback collection and management.

---

## 🏗️ Architecture Overview

This repository is an **Nx monorepo** built around a clear separation of concerns:

```
apps/
├── web/    # Next.js frontend (@game-advisor/web)
└── api/    # Nest.js backend (@game-advisor/api)
```

**High-level flow:**

1. User sends a **free-form prompt** via the web app (e.g., "I want a story-rich RPG with turn-based combat").
2. Backend calls the **AI normalization pipeline** (Google AI/OpenAI), turning the prompt into structured filters.
3. Backend queries **external game databases** (RAWG.io API) and internal PostgreSQL database.
4. Results are **scored, re-ranked and filtered** using user preferences, favorites, and semantic search.
5. Frontend displays a **ranked list with explanations**, allowing users to save favorites, manage collections, and refine preferences.

**Database Schema:**

- **Users** with preferences linking to favorite/completed/chosen/banned games
- **Games** with genres, platforms, and vector embeddings for semantic search
- **JWT authentication** with email confirmation and password reset
- **Feedback system** for user input collection

---

## 🧩 Frontend Stack – `@game-advisor/web`

**Core technologies**

- ⚛️ **React**
- 🌐 **Next.js**
- 🎨 **Tailwind CSS**
- 🔗 **next-auth**

**UI & design system**

- 🧱 **Shadcn w/ Radix UI**
- 🎨 **lucide-react**
- 📝 **react-toastify**
- 🧊 **Three.js**

**Forms & validation**

- 📝 **react-hook-form**
- ✅ **zod**

**Testing & quality**

- 🧪 **Jest**
- 🧹 **ESLint**
- 🧱 **TypeScript**
- 💅 **Prettier**
- 🤖 **Github Workflow**

---

## 🧰 Backend Stack – `@game-advisor/api`

- 🧱 **Nest.js** – Progressive Node.js framework with modular architecture
- 🗄️ **PostgreSQL + pgvector** – Vector database for semantic search capabilities
- 🔷 **Prisma ORM** – Type-safe database access with schema management
- 🔑 **JWT Authentication** – Secure token-based authentication with email confirmation
- 📧 **Nodemailer** – Email service integration for user verification
- 🤖 **AI Integration** – Google Generative AI + OpenAI for prompt processing
- 🌐 **GraphQL + Apollo** – Flexible API with automatic schema generation
- 📚 **Swagger/OpenAPI** – REST API documentation
- ✅ **Class Validator** – Request validation and transformation
- 🐳 **Docker** – Containerized deployment

**Core Modules:**

- **`AuthModule`** – JWT authentication, email confirmation, password reset
- **`UserModule`** – User profiles, preferences, favorites, and collections
- **`GameModule`** – Game search, AI advice generation, external API integration
- **`GenreModule`** – Game genre management
- **`PlatformModule`** – Gaming platform management
- **`FeedbackModule`** – User feedback collection
- **`MailModule`** – Email sending services
- **`PrismaModule`** – Database ORM and connection management

### 🌍 API Surface

The backend exposes **both REST and GraphQL APIs** for maximum flexibility:

- 🌐 **REST API**
  - **Base URL:** `http://localhost:4200/api`
  - **Documentation:** `http://localhost:4200/docs` (Swagger UI)
  - **Authentication:** Bearer token in `Authorization` header

- 🔺 **GraphQL API**
  - **Endpoint:** `http://localhost:4200/graphql`
  - **Playground:** `http://localhost:4200/graphql` or Apollo Studio
  - **Schema:** Auto-generated from TypeScript types
