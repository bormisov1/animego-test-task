FROM node:14.17.0-alpine3.10 AS base
RUN npm i -g pnpm
RUN npm i -g @nestjs/cli

FROM base AS dependencies
WORKDIR /app
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install

# RUN pnpm add -D @types/ws
# RUN pnpm add @nestjs/graphql@9.1.2
# RUN pnpm add apollo-server-express@3.8.1

FROM base AS dev_build
WORKDIR /app
COPY --chown=node:node . .
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
RUN rm -rf dist/

# RUN pnpm generate
RUN pnpm build
RUN pnpm prune --prod

FROM base AS prod_build
WORKDIR /app

COPY --chown=node:node --from=dev_build /app/dist/ ./dist/
COPY --chown=node:node --from=dev_build /app/node_modules ./node_modules
CMD [ "node", "dist/main.js" ]


# FROM node:16-alpine AS builder
# WORKDIR /build
# RUN corepack enable pnpm
# COPY pnpm-lock.yaml ./
# RUN pnpm fetch
# COPY . ./
# RUN pnpm i --offline --frozen-lockfile
# RUN apk add --no-cache openssl openssl-dev libssl1.1 libssl3
# RUN rm -rf dist/
# RUN pnpm generate && pnpm build
# RUN pnpm prune --prod
# #RUN find node_modules \( -name "*on-engine*" -o -wholename "*/prisma/libquery*" -o -wholename "*/*prisma*engine*/*" -o -wholename "*/prisma@*/*" \) -delete

# FROM node:16-alpine
# WORKDIR /app
# COPY package*.json ./
# COPY --from=builder /build/node_modules node_modules/
# COPY --from=builder /build/dist dist/
# RUN corepack enable pnpm
# EXPOSE 8080
# CMD ["pnpm", "start"]
