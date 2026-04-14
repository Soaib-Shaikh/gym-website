import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Success from './pages/Success'
import Profile from './pages/auth/Profile'
import EditProfile from './pages/auth/EditProfile'

import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import AddTrainer from './pages/admin/trainer/AddTrainer'
import ViewTrainer from './pages/admin/trainer/ViewTrainer'
import PendingPayments from './pages/admin/payment/PendingPayments'
import CompletedPayments from './pages/admin/payment/Completedpayments'
import Contacts from './pages/admin/contact/Contacts'
import AdminLayout from './layouts/AdminLayout'
import Trainers from './pages/Trainers'
import MyBookings from './pages/auth/MyBookings'
import BookTrainer from './pages/BookTrainer'
import AdminBookings from './pages/admin/trainer/AdminBookings'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/auth/ForgotPasword'
import ResetPassword from './pages/auth/ResetPassword'





const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(20,20,20,0.9)",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "14px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          },
          success: {
            style: {
              borderLeft: "4px solid #22c55e",
            },
          },
          error: {
            style: {
              borderLeft: "4px solid #ef4444",
            },
          },
        }}
      />

      <Routes>


        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* MAIN */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='services' element={<Services />} />
          <Route path='trainers' element={<Trainers />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='contact' element={<Contact />} />
          <Route path="success" element={<Success />} />

          <Route
            path="profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />

          <Route
            path="edit-profile"
            element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
          />

          <Route
            path="book-trainer"
            element={
              <ProtectedRoute>
                <BookTrainer />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

        </Route>



        {/* 👑 ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="trainers/add" element={<AddTrainer />} />
          <Route path="trainers/view" element={<ViewTrainer />} />
          <Route path="payments/pending" element={<PendingPayments />} />
          <Route path="payments/completed" element={<CompletedPayments />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="bookings" element={<AdminBookings />} />

        </Route>

      </Routes>
    </>
  )
}

export default App