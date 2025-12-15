-- 1. Enable pgvector extension (required for vector column type)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add embedding field to Game model
ALTER TABLE "Game"
ADD COLUMN "embedding" vector(1536);