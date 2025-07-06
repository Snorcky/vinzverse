import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import MesVideos from './pages/mes-videos';
import LoginPage from './components/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import SectionsManager from './components/admin/SectionsManager';
import UsersManager from './components/admin/UsersManager';
import MessagesManager from './components/admin/MessagesManager';
import ProfileManager from './components/admin/ProfileManager';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/mes-videos" element={<MesVideos />} />
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sections" element={<SectionsManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route 
              path="users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <UsersManager />
                </ProtectedRoute>
              } 
            />
            <Route path="profile" element={<ProfileManager />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;