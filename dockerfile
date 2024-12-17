# Use an official Node.js runtime as the base image
FROM node:18.16.0
# Create a working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install application dependencies
RUN npm install
# Copy the rest of your application source code to the working directory
COPY . .
# Build your application
RUN npm run build
# Set the working directory to the 'dist' folder
WORKDIR /app/dist
# Expose a port (if your application listens on a specific port)
EXPOSE 3000
# Run the migration and start server
CMD ["sh", "-c", "node /app/node_modules/typeorm/cli.js migration:run -d /app/dist/config/db.js && node server.js"]
