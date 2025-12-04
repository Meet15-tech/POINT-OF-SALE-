# Use official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package* first to install deps (leverage layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port ( docker-compose maps it)
EXPOSE 8000

# Use non-root user (optional but recommended)
RUN addgroup -S app && adduser -S app -G app
USER app

# Start command
CMD ["node", "server.js"]