# STAGE 1: Build the React Application
# Use a Node image for compiling and building
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Run the production build (creates the static files in /app/dist)
RUN npm run build

# STAGE 2: Serve the Static Files with Nginx
# Use a super light-weight Nginx image for serving
FROM nginx:alpine

# Copy the built files from the 'builder' stage to the Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx listens on port 80 by default
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]