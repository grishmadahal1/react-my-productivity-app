import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tasks',
    element: (
      <ProtectedRoute>
        <Tasks />
      </ProtectedRoute>
    ),
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
          <a
            href="/dashboard"
            className="inline-block px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-primary-600 text-white hover:bg-primary-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    ),
  },
]);