FROM node:18-alpine

WORKDIR /app

# Copy only the package.json file first to leverage Docker caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3004

# Run the application using `npm run dev`
CMD ["npm", "run", "start"]
