import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookDetail from './pages/BookDetail';
import BookReviews from './pages/BookReviews';
import AdminDashboard from './pages/admin/AdminDashboard';
import MembersPage from './pages/admin/MembersPage';
import BooksPage from './pages/admin/BooksPage';
import TransactionsPage from './pages/admin/TransactionsPage';
import './App.css';

// Komponen untuk mengarahkan pengguna berdasarkan peran
const RoleBasedRedirect = () => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (currentUser.role === 'admin') {
    return <Navigate to="/admin" />;
  }
  
  return <Navigate to="/dashboard" />;
};

// Komponen untuk rute yang dilindungi (hanya untuk pengguna yang sudah login)
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Komponen untuk rute admin (hanya untuk pengguna dengan peran admin)
const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Role-based redirect */}
          <Route path="/" element={<RoleBasedRedirect />} />
          
          {/* Protected user routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book/:id" 
            element={
              <ProtectedRoute>
                <BookDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book/:id/reviews" 
            element={
              <ProtectedRoute>
                <BookReviews />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/members" 
            element={
              <AdminRoute>
                <MembersPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/books" 
            element={
              <AdminRoute>
                <BooksPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/transactions" 
            element={
              <AdminRoute>
                <TransactionsPage />
              </AdminRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;