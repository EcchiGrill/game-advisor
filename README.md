# 🎮 Game Advisor

> 🚀 *AI-powered assistant that helps you find the right game faster, with less scrolling and more playing.*

Game Advisor is an AI tool designed to simplify the game discovery process.
Instead of endless filters and store tabs, you describe what you feel like playing in natural language, and the app does the rest:

* “I want a story-rich RPG with turn-based combat, similar to Divinity, but shorter.”
* “Co-op games for 3 friends on PC, low system requirements.”
* “Something cozy for evenings, no horror, strong narrative.”

Game Advisor normalizes your prompt with AI into structured search criteria, queries external game databases, and ranks results based on your tastes, history and favorites.

---

## ✨ Core Features

* 🎯 **Natural language search** – Type what you want to play, not how the filters are named.
* 🧠 **AI prompt normalization** – LLM turns messy text into structured constraints (genre, mood, platforms, difficulty, tags, playtime, etc.).
* 📚 **Multi-source game catalog** – Aggregates data from external game databases / APIs to maximize coverage and metadata quality.
* 🧪 **Smart ranking & scoring** – Combines AI + metadata + your personal profile to surface the most relevant picks.
* ❤️ **User accounts & favorites** – Save favorites, hide disliked games, maintain wishlists and backlogs.
* 🧬 **Personalized suggestions** – Uses your history, favorites and interactions to refine future recommendations.
* 🗂️ **Game library & management** – Mark games as *owned*, *completed*, *backlog*, etc. to tune recommendations.
* 🔍 **Explainable results (planned)** – Show *why* a game was recommended (“matches your love for tactics + short campaigns”, etc.).

---

## 🏗️ Architecture Overview

This repository is an **Nx monorepo** built around a clear separation of concerns:

* `apps/web` – Next.js frontend (`@game-advisor/web`)
* `apps/api` – Nest.js backend (`@game-advisor/api`)

High-level flow:

1. User sends a **free-form prompt** via the web app.
2. Backend calls the **AI normalization pipeline**, turning the prompt into structured filters.
3. Backend queries **external game databases** via REST / GraphQL providers.
4. Results are **scored, re-ranked and filtered** (e.g., exclude games you finished or flagged as “never show again”).
5. Frontend displays a **ranked list with explanations**, allowing you to save favorites, manage collections and refine preferences.

---

## 🧩 Frontend Stack – `@game-advisor/web`

**Core technologies**

* ⚛️ **React**
* 🌐 **Next.js** 
* 🎨 **Tailwind CSS**
* 🔗 **next-auth**

**UI & design system**

* 🧱 **Shadcn w/ Radix UI**
* 🎨 **lucide-react**
* 📝 **react-toastify**
* 🧊 **Three.js**

**Forms & validation**

* 📝 **react-hook-form**
* ✅ **zod**

**Testing & quality**

* 🧪 **Jest**
* 🧹 **ESLint**
* 🧱 **TypeScript**
* 💅 **Prettier**
* 🤖 **Github Workflow**

---

## 🧰 Backend Stack – `@game-advisor/api`

* 🧱 **Nest.js** – modular, testable backend framework with:

  * `GameModule` – game search, game details, external providers
  * `SearchModule` – AI normalization & filtering logic
  * `UserModule` – user accounts, preferences, favorites, collections
  * `AuthModule` – JWT / session strategy compatible with `next-auth`
* 🗄️ **Database** – PostgreSQL + Prisma with:

  * `users`, `profiles`, `favorites`, `history`, `blocked_games`, etc.
  * caching of frequently used game data / search results
* 🧠 **AI integration**

  * LLM provider for prompt → structured query transformation.
  * Potential model usage for:

    * re-ranking results
    * explanation generation
    * fuzzy constraints (“cozy”, “short”, “not too grindy”).

### 🌍 API Surface

The backend is designed to support **both REST and GraphQL**:

* 🌐 **REST API**

  * Ideal for simple clients, internal services, or quick integrations.

* 🔺 **GraphQL API**

  * Rich, flexible querying for frontends that need control over payload shape.
  * Single endpoint e.g. `/graphql`.

Both layers share the same domain models and services inside Nest.js, keeping business logic DRY while exposing multiple protocols.
