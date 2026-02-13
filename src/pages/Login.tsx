import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ backgroundColor: '#fafbfc' }}>
      <div className="w-full px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 shadow-sm" style={{ backgroundColor: '#60a5fa' }}>
            <span className="font-bold text-2xl" style={{ color: 'white' }}>P</span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#4b5563' }}>ProDash</h1>
          <p className="text-base" style={{ color: '#9ca3af' }}>
            Track your productivity and achieve your goals
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl shadow-sm border p-6 sm:p-8" style={{ backgroundColor: '#ffffff', borderColor: '#f3f4f6' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#374151' }}>
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-sm" style={{ color: '#9ca3af' }}>
              {isLogin 
                ? 'Enter your credentials to access your dashboard' 
                : 'Start tracking your productivity today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                error={errors.name}
              />
            )}
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
            />

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    style={{ accentColor: '#3b82f6' }}
                  />
                  <span className="ml-2 text-sm" style={{ color: '#6b7280' }}>
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm"
                  style={{ color: '#3b82f6' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {errors.submit && (
              <p className="text-sm" style={{ color: '#ef4444' }}>{errors.submit}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Create account')}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: '#e5e7eb' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2" style={{ backgroundColor: '#ffffff', color: '#9ca3af' }}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium" style={{ color: '#374151' }}>Google</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                <Github className="w-5 h-5" style={{ color: '#374151' }} />
                <span className="text-sm font-medium" style={{ color: '#374151' }}>GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: '#9ca3af' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium"
              style={{ color: '#3b82f6' }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}