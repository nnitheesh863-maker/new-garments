@echo off
echo ========================================
echo Firebase Setup for Garment Production
echo ========================================
echo.
echo This script will help you set up Firebase
echo for the garment production system.
echo.
echo Please follow these steps:
echo.
echo 1. Create a Firebase project at:
echo    https://console.firebase.google.com/
echo.
echo 2. Enable Firestore Database:
echo    - Go to Firestore Database
echo    - Click "Create Database"
echo    - Choose "Start in test mode"
echo.
echo 3. Get Service Account Credentials:
echo    - Go to Project Settings > Service Accounts
echo    - Click "Generate new private key"
echo    - Save the JSON file
echo.
echo 4. Copy the following values to backend/.env:
echo.
echo    FIREBASE_PROJECT_ID=your-project-id
echo    FIREBASE_PRIVATE_KEY_ID=your-key-id
echo    FIREBASE_PRIVATE_KEY=your-private-key
echo    FIREBASE_CLIENT_EMAIL=your-email@project.iam.gserviceaccount.com
echo    FIREBASE_CLIENT_ID=your-client-id
echo.
echo 5. Run: node backend/init-firebase.js
echo.
echo ========================================
echo Press any key to continue...
pause >nul
