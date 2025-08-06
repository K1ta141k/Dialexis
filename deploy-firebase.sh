#!/bin/bash

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Error: Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "Error: Not logged in to Firebase. Please run 'firebase login' first."
    exit 1
fi

# Build the React app
echo "Building the React application..."
npm run build

# Deploy to Firebase Hosting
echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "Deployment completed!"
echo "Your app should be available at the URL shown above."
echo ""
echo "To update the API configuration, edit src/config/auth.js and change the API_BASE_URL to your backend URL." 