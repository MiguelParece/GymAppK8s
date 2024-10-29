# Use the official Node.js 18 image
FROM node:18-alpine
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port the service runs on
EXPOSE 80

# Start the application
CMD ["node", "gym-exercises-server.js"]

