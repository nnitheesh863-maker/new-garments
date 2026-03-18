# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Enter project name (e.g., "garment-production-system")
4. Disable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Select "Start in test mode" (for development)
4. Choose location (e.g., "us-central")
5. Click "Enable"

## Step 3: Get Service Account Credentials

1. Go to Project Settings (gear icon ⚙️)
2. Click "Service Accounts" tab
3. Click "Generate new private key"
4. Save the JSON file as `serviceAccountKey.json`
5. Copy the values to your `.env` file

## Step 4: Configure Environment Variables

Create `.env` file in the `backend` folder:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here

FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project-id.iam.gserviceaccount.com
```

## Step 5: Initialize Database

Run the initialization script:

```bash
cd backend
npm install
node init-firebase.js
```

## Step 6: Start the Application

```bash
# Backend
cd backend
npm start

# Frontend (in new terminal)
cd frontend
npm start
```

## Step 7: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Demo Credentials

- **Employee**: emp@test.com / password
- **Manager**: mgr@test.com / password
- **Admin**: admin@test.com / password

## Security Rules (Optional)

For production, update Firestore security rules in Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
