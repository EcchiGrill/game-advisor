# 🎯 Game Advisor API

> 🚀 _Backend service powering the Game Advisor platform - AI-driven game discovery with natural language search._

The Game Advisor API is a robust Nest.js backend that serves as the core engine for the Game Advisor platform. It provides both REST and GraphQL APIs for game discovery, user management, authentication, and AI-powered recommendations.

---

## ✨ Core Features

- 🎮 **Game Discovery** – AI-powered natural language search with structured query normalization
- 🔐 **Authentication & Authorization** – JWT-based auth with email confirmation and password reset
- 👤 **User Management** – Profiles, preferences, favorites, and gaming history tracking
- 📊 **Game Database** – PostgreSQL with pgvector for semantic search capabilities
- 🌐 **Dual API Support** – REST API for simplicity + GraphQL for flexibility
- 📧 **Email Services** – Automated email confirmation and password reset
- 📈 **Feedback System** – User feedback collection and management
- 🔍 **External API Integration** – RAWG.io game database integration
- 🐳 **Docker Ready** – Containerized deployment with PostgreSQL

---

## 🏗️ Architecture Overview

This is a modular Nest.js application built around clear separation of concerns:

```
src/
├── auth/           # Authentication & authorization
├── models/         # Domain models (Game, User, Genre, Platform, Feedback)
├── prisma/         # Database service & configuration
├── mail/           # Email service
├── lib/utils/      # Utility functions & helpers
├── const/          # Application constants
└── types/          # TypeScript type definitions
```

### Core Modules

- **`AuthModule`** – JWT authentication, email confirmation, password reset
- **`UserModule`** – User profiles, preferences, favorites, and collections
- **`GameModule`** – Game search, AI advice generation, external API integration
- **`GenreModule`** – Game genre management
- **`PlatformModule`** – Gaming platform management
- **`FeedbackModule`** – User feedback collection
- **`MailModule`** – Email sending services
- **`PrismaModule`** – Database ORM and connection management

---

## 🧰 Technology Stack

- 🧱 **Nest.js** – Progressive Node.js framework with modular architecture
- 🗄️ **PostgreSQL + pgvector** – Vector database for semantic search
- 🔷 **Prisma ORM** – Type-safe database access with schema management
- 🔑 **JWT Authentication** – Secure token-based authentication
- 📧 **Nodemailer** – Email service integration
- 🤖 **AI Integration** – Google Generative AI + OpenAI for prompt processing
- 🌐 **GraphQL + Apollo** – Flexible API with automatic schema generation
- 📚 **Swagger/OpenAPI** – REST API documentation
- ✅ **Class Validator** – Request validation and transformation
- 🐳 **Docker** – Containerized deployment

---

## 🌍 API Surface

The backend exposes both REST and GraphQL APIs for maximum flexibility:

### REST API

- **Base URL:** `http://localhost:4200/api`
- **Documentation:** `http://localhost:4200/docs` (Swagger UI)
- **Authentication:** Bearer token in `Authorization` header

### GraphQL API

- **Endpoint:** `http://localhost:4200/graphql`
- **Playground:** `http://localhost:4200/graphql` or Apollo Studio
- **Schema:** Auto-generated from TypeScript types

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Docker

### Environment Setup

Create a `.env` file in the `apps/api` directory:

```env
# DB
DATABASE_URL="postgresql://postgres:1111@localhost:2000/postgres?schema=public"

# RAWG
RAWG_API_KEY=3213213123

# AI
OPENAI_API_KEY=323213121
GEMINI_API_KEY=3232131212

# Postgres
POSTGRES_EXTERNAL_PORT=2000
POSTGRES_USER=postgres
POSTGRES_DB=postgres
POSTGRES_PASSWORD=11111

# JWT
JWT_SECRET=365183e21880825a35c98d23a5516d6...

# Gmail SMTP Configuration
GMAIL_USER=smtp@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx

# Feedback
FEEDBACK_RECEIVER=test@gmail.com

# Frontend URL (Reset Password link)
FRONTEND_URL=http://localhost:3000
```

### Installation & Development

```bash
# Install dependencies
npm install

# Run Docker
docker-compose up

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

---

## 🔧 Development Guidelines

### Code Organization

- **Modules** – Each domain (auth, user, game) has its own module
- **Separation** – Clear separation between REST controllers and GraphQL resolvers
- **Types** – Shared TypeScript types for consistent API contracts
- **Validation** – DTOs with class-validator for input validation
- **Database** – Prisma schema-first approach with type-safe queries

### Key Conventions

- **Naming** – PascalCase for classes, camelCase for properties/methods
- **File Structure** – Feature-based organization within modules
- **Error Handling** – Consistent error responses with proper HTTP status codes
- **Testing** – Jest setup with focus on integration tests
- **Documentation** – Swagger decorators for REST API documentation

### API Design Principles

- **RESTful** – Standard HTTP methods and status codes
- **GraphQL** – Single endpoint with flexible queries
- **Versioning** – API versioning through URL paths when needed
- **Pagination** – Cursor-based pagination for large datasets
- **Filtering** – Flexible filtering with query parameters
- **Caching** – Database-level caching for frequently accessed data

---

## 📊 Monitoring & Analytics

- **Swagger UI** – Interactive API documentation at `/docs`
- **GraphQL Playground** – Development tool at `/graphql`
- **Apollo Studio** – Advanced GraphQL development and monitoring
