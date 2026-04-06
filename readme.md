# Gym Website

A comprehensive gym management website built with a modern client-server architecture. This platform allows users to explore gym services, book trainers, make payments, and manage their profiles, while providing administrators with tools to oversee operations, manage users, trainers, bookings, and payments.

## Deploy Link

Link:- https://gym-website-pi-eight.vercel.app/

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Admin Credentials](#admin-credentials)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

### User Features
- **Home Page**: Overview of gym services and facilities
- **Services**: Detailed information about gym offerings
- **Trainers**: View and book personal trainers
- **Pricing**: Membership plans and pricing details
- **Contact**: Get in touch with the gym
- **User Authentication**: Sign up, login, and profile management
- **Booking System**: Book trainer sessions
- **Payment Integration**: Secure payments via Razorpay

### Admin Features
- **Dashboard**: Overview of key metrics and statistics
- **User Management**: View and manage user accounts
- **Trainer Management**: Add, view, and manage trainers
- **Booking Management**: View and manage trainer bookings
- **Payment Management**: Monitor pending and completed payments
- **Contact Management**: Handle user inquiries

## Tech Stack

### Client (Frontend)
- **React**: UI library for building user interfaces
- **Vite**: Fast build tool and development server
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Recharts**: Chart library for data visualization

### Server (Backend)
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Cloudinary**: Cloud-based image storage
- **Razorpay**: Payment gateway integration
- **Nodemailer**: Email sending functionality
- **Multer**: File upload handling

## Folder Structure

```
gym-website/
├── readme.md                 # Project README
├── client/                   # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/              # API configuration (Axios)
│   │   ├── assets/           # Images and other assets
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── Navbar.jsx
│   │   ├── layouts/          # Layout components
│   │   │   ├── AdminLayout.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── About.jsx
│   │   │   ├── BookTrainer.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Success.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── admin/        # Admin pages
│   │   │   │   ├── Admin.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Users.jsx
│   │   │   │   ├── contact/
│   │   │   │   │   └── Contacts.jsx
│   │   │   │   ├── payment/
│   │   │   │   │   ├── Completedpayments.jsx
│   │   │   │   │   └── PendingPayments.jsx
│   │   │   │   └── trainer/
│   │   │   │       ├── AddTrainer.jsx
│   │   │   │       ├── AdminBookings.jsx
│   │   │   │       └── ViewTrainer.jsx
│   │   │   └── auth/         # Authentication pages
│   │   │       ├── EditProfile.jsx
│   │   │       ├── Login.jsx
│   │   │       ├── MyBookings.jsx
│   │   │       ├── Profile.jsx
│   │   │       └── Signup.jsx
│   │   ├── routes/           # Route protection components
│   │   │   ├── AdminRoute.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # App entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
└── server/                   # Backend Node.js application
    ├── configs/              # Configuration files
    │   ├── cloudinary.js
    │   ├── db.js
    │   └── mail.js
    ├── controllers/          # Route controllers
    │   ├── adminController.js
    │   ├── bookingController.js
    │   ├── ContactController.js
    │   ├── paymentController.js
    │   ├── trainerController.js
    │   ├── uploadController.js
    │   └── userController.js
    ├── middlewares/          # Custom middlewares
    │   ├── adminMiddleware.js
    │   ├── authMiddleware.js
    │   └── upload.js
    ├── models/               # Database models
    │   ├── bookingModel.js
    │   ├── contactModel.js
    │   ├── paymentModel.js
    │   ├── trainerModel.js
    │   └── userModel.js
    ├── routes/               # API routes
    │   ├── adminRoutes.js
    │   ├── authRoutes.js
    │   ├── bookingRoutes.js
    │   ├── contactRoutes.js
    │   ├── paymentRoutes.js
    │   ├── trainerRoutes.js
    │   └── uploadRoutes.js
    ├── index.ts              # Server entry point (TypeScript)
    ├── server.js             # Server entry point (JavaScript)
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The client will be running on `http://localhost:5173` (default Vite port).

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will be running on `http://localhost:5000`.

## Usage

### For Users
1. Visit the website and create an account or log in.
2. Browse services, trainers, and pricing.
3. Book trainer sessions.
4. Make payments for services.
5. Manage your profile and view bookings.

### For Admins
1. Log in with admin credentials.
2. Access the admin dashboard.
3. Manage users, trainers, bookings, and payments.
4. View contact inquiries.

## How It Works

### User Flow
1. **Registration/Login**: Users create accounts or log in.
2. **Browse Services**: Users explore gym services, trainers, and pricing.
3. **Booking**: Users select trainers and book sessions.
4. **Payment**: Secure payment processing via Razorpay.
5. **Confirmation**: Users receive booking confirmations and email notifications.

### Admin Process
1. **Authentication**: Admins log in with special credentials.
2. **Dashboard Overview**: View key metrics and recent activities.
3. **Management**: Add/edit trainers, view user details, manage bookings.
4. **Payment Monitoring**: Track pending and completed payments.
5. **Communication**: Respond to user contacts and inquiries.

### Technical Process
- **Frontend**: React components render UI, Redux manages state, Axios handles API calls.
- **Backend**: Express routes handle requests, controllers process business logic, models interact with MongoDB.
- **Authentication**: JWT tokens for session management.
- **File Uploads**: Multer handles file uploads, Cloudinary stores images.
- **Payments**: Razorpay integration for secure transactions.
- **Email**: Nodemailer sends notifications and confirmations.

## Admin Credentials

- **Email**: soaib@gmail.com
- **Password**: Sam@1002

Use these credentials to log in to the admin panel at `/admin`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Trainers
- `GET /api/trainers` - Get all trainers
- `POST /api/trainers` - Add trainer (admin only)
- `PUT /api/trainers/:id` - Update trainer (admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings` - Get all bookings (admin only)

### Payments
- `POST /api/payments/create` - Create payment order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments` - Get all payments (admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/users` - Get all users
- `GET /api/admin/contacts` - Get all contacts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.