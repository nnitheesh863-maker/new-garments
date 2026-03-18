# Installation Guide

## Quick Start with Docker (Recommended)

### Prerequisites
- Docker Desktop installed
- Docker Compose

### Steps
1. Clone or download this project
2. Open terminal in the project directory
3. Run the following commands:

```bash
# Start all services
docker-compose up -d

# Check if services are running
docker-compose ps
```

4. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000/api

## Manual Setup

### Backend Setup

1. Install MongoDB
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud)

2. Navigate to backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/garment_production
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Open `index.html` in your browser, or use a simple HTTP server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .
```

3. Access the application at http://localhost:8000

## Default Login Credentials

After registering, you can use these roles:
- **Employee** - For production workers
- **Manager** - For team supervisors
- **Admin** - For system administrators

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Materials
- `GET /api/materials` - Get all materials
- `POST /api/materials` - Create new material
- `PUT /api/materials/:id` - Update material

### Production
- `GET /api/production` - Get all production records
- `POST /api/production` - Create production entry
- `GET /api/production/employee/:id` - Get employee's production

### Machines
- `GET /api/machines` - Get all machines
- `POST /api/machines` - Create machine
- `POST /api/machines/:id/report-issue` - Report machine issue

### Salary
- `GET /api/salary/:employeeId` - Get salary records
- `POST /api/salary` - Create salary record

### Leaves
- `GET /api/leaves/:employeeId` - Get leave records
- `POST /api/leaves` - Apply for leave

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on port 27017
- Check the `MONGODB_URI` in your `.env` file

### CORS Issues
- The backend is configured to allow all origins in development
- For production, update `cors()` configuration in `server.js`

### Port Already in Use
- Change the PORT in `.env` file if 5000 is occupied
- Update the API URL in `frontend/scripts/app.js` accordingly
