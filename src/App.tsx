import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<DashboardPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="sections" element={<div>Gestion des sections (à implémenter)</div>} />
            <Route path="navigation" element={<div>Gestion de la navigation (à implémenter)</div>} />
            <Route path="messages" element={<div>Gestion des messages (à implémenter)</div>} />
            <Route path="settings" element={<div>Paramètres du site (à implémenter)</div>} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;