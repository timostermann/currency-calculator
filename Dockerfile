# Stage 1: Builder
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies (cached unless package files change)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .

# Browser-visible env vars must be available at build time to be inlined
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN

RUN npm run build

# Stage 2: Runtime
FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Remove the npm CLI bundled with the base image: it (and its vendored deps
# like undici) is unused at runtime since we only run "node server.js", and
# dropping it removes that package's CVEs from the shipped image entirely.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
    /usr/local/lib/node_modules/corepack

# Copy standalone server output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
