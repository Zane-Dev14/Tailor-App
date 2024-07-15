#!/bin/bash

# Create package.json for backend
cat <<EOL > backend/package.json
{
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.1.2",
    "cors": "^2.8.5",
    "body-parser": "^1.19.1"
  }
}
EOL

# Create package.json for frontend
cat <<EOL > frontend/package.json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "react-scripts start"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "axios": "^0.24.0"
  }
}
EOL

# Create package.json for root directory (concurrent setup)
cat <<EOL > package.json
{
  "name": "tailor-shop-management",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\"",
    "start:backend": "cd backend && npm start",
    "start:frontend": "cd frontend && npm start",
    "install": "cd backend && npm install && cd ../frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^6.4.0"
  }
}
EOL

# Instructions for installation
echo "Project structure and package.json files created successfully."
echo "Navigate to 'Tailor' directory and run 'npm install' to install dependencies."
echo "To start the application, run 'npm start'. This will start both backend and frontend servers concurrently."
