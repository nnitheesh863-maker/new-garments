# AI-Powered Garment Production Management System

A comprehensive full-stack garment production management system with role-based dashboards for Employees, Managers, and Admins. Built with Node.js, React, and MongoDB.

## Features

### 🏭 Employee Dashboard
- **Production Entry** - Daily production tracking with order management
- **Material Tracking** - Request and monitor materials inventory
- **Machine Reporting** - Report issues with urgency levels
- **Salary & Payments** - View earnings, deductions, and history
- **Leave Management** - Apply for leaves and track balance
- **Training & Development** - Course management and progress tracking
- **Communication Center** - Team chat and notifications

### 👔 Manager Dashboard
- **Team Overview** - Real-time employee monitoring and performance tracking
- **Production Monitoring** - Live production board and order management
- **Material Management** - Request approval and inventory control
- **Quality Management** - Defect analysis and inspection scheduling
- **Analytics** - Performance trends and KPI tracking

### ⚙️ Admin Dashboard
- **User Management** - Add, edit, and manage user accounts
- **System Settings** - Company configuration and policies
- **Master Data** - Products, materials, machines catalog
- **Reports & Analytics** - Financial and operational reports
- **Compliance & Audit** - Regulatory tracking and audit schedules
- **AI Model Management** - Machine learning model monitoring

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** for database
- **JWT** for authentication
- **Socket.io** for real-time updates

### Frontend
- **React** with functional components
- **React Router** for navigation
- **Bootstrap 5** for styling
- **i18next** for multi-language support
- **Chart.js** for data visualization

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd garment-production-system
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Create environment file**
Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/garment_production
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. **Frontend Setup**
```bash
cd ../frontend
npm install
```

5. **Start the application**
```bash
# Backend (in backend directory)
npm run dev

# Frontend (in frontend directory)
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee

### Materials
- `GET /api/materials` - Get all materials
- `POST /api/materials` - Create material
- `PUT /api/materials/:id` - Update material

### Production
- `GET /api/production` - Get all production records
- `POST /api/production` - Create production entry
- `GET /api/production/employee/:id` - Get employee production

### Machines
- `GET /api/machines` - Get all machines
- `POST /api/machines/:id/report-issue` - Report machine issue

### Salary
- `GET /api/salary/:employeeId` - Get salary records

### Leaves
- `GET /api/leaves/:employeeId` - Get leave records
- `POST /api/leaves` - Apply for leave

## Database Models

### User
- employeeId, name, email, password, role, department, designation
- personal details, bank details, emergency contacts, language preferences

### Material
- materialId, name, type, quantity, unit, qualityGrade
- batchNumber, supplier, storageLocation, status

### Production
- productionId, orderId, employeeId, productType, size, color
- targetQuantity, actualQuantity, rejectedQuantity, qualityGrade
- machineUsed, startTime, endTime, overtimeHours

### Machine
- machineId, name, type, model, serialNumber
- assignedEmployee, operatingHours, maintenanceSchedule, status

### Salary
- salaryId, employeeId, month, year, basePay, overtimePay
- bonuses, deductions, netPay, paymentStatus

### Leave
- leaveId, employeeId, leaveType, startDate, endDate
- reason, status, approvedBy

## Project Structure

```
garment-production-system/
├── backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   └── middleware/            # Authentication middleware
│
├── frontend/
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   └── styles/            # CSS files
│   └── package.json           # Frontend dependencies
│
├── docker-compose.yml         # Docker configuration
└── README.md                  # Project documentation
```

## Demo Credentials

- **Employee**: emp@test.com / password
- **Manager**: mgr@test.com / password
- **Admin**: admin@test.com / password

## Features Roadmap

### Phase 1 (MVP) ✓
- User authentication and registration
- Employee dashboard core features
- Production entry and tracking
- Material request system
- Basic reporting

### Phase 2 (In Progress)
- Advanced analytics with charts
- Multi-language support (Tamil, Hindi)
- Leave management system
- Salary processing
- Quality control features

### Phase 3 (Planned)
- AI/ML predictions
- Real-time updates with WebSocket
- Mobile responsive design
- Hardware integration (RFID, biometrics)
- Advanced reporting

### Phase 4 (Future)
- Predictive maintenance
- Blockchain for traceability
- Smart factory integration
- Digital twin simulation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the repository.
