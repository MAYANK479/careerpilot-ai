# Use an official Node runtime as a parent image
FROM node:20 AS builder

# Set working directory for building the client
WORKDIR /app

# Install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm ci

# Copy client source and build
COPY client/. ./client/
RUN cd client && npm run build

# Production image
FROM node:20

WORKDIR /app

# Copy server package files and install server dependencies
COPY package.json .
COPY server ./server
RUN npm ci --only=production

# Copy built client assets into server public directory
COPY --from=builder /app/client/dist ./server/public

# Expose the port (Render will set PORT env var)
EXPOSE 8080
ENV PORT=8080

# Start the server
CMD ["node", "server/index.js"]
