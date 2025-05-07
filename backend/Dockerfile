# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

COPY . .
# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Create a script to run both processes
RUN echo '#!/bin/sh\nnode dist/index.js & node dist/send.js & wait' > /app/start.sh && \
    chmod +x /app/start.sh

# Expose ports
EXPOSE 4000 4001

# Start both processes
CMD ["/app/start.sh"] 