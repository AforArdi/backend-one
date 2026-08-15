FROM node:alpine

WORKDIR /app

# Install specific pnpm version
RUN npm install -g pnpm@10.34.5

# Copy package files
COPY package.json ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy Prisma config, schema and generate client (required for auth/db)
COPY prisma.config.ts ./
COPY prisma ./prisma/
RUN pnpm prisma generate

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["pnpm", "run", "start"]
