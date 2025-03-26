# Use Node.js LTS as base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Prisma globally
RUN npm install -g prisma

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]