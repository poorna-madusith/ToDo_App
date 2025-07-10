import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Addmodel from './components/Addmodel'
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<PrivateRoute><Addmodel /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
