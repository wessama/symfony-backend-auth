# Dockerfile
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy app files
COPY . /app

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
