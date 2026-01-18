# -------- Base --------
FROM node:20-alpine AS base


# -------- Dependencies --------
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY  package*.json ./
RUN npm ci

# -------- Builder --------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start"]

# docker compose up -d postgres
# docker compose exec nextjs npx prisma migrate deploy
# docker compose exec nextjs npx prisma db seed
# docker compose up -d nextjs

# docker compose run --rm -p 5555:5555 nextjs \
#   npx prisma studio --hostname 0.0.0.0 --port 5555
