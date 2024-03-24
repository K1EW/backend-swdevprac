# Use the official Node.js 20 as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# The application's port could be set by an environment variable at runtime. No need to EXPOSE a specific port.
# However, you might still want to document the default port your app expects to use
# EXPOSE 3000

# Define environment variables
# ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "server.js"]
