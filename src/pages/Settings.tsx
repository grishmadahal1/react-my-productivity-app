import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Moon, Sun, Save } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    timezone: 'UTC-5 (EST)',
    language: 'English',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyReport: false,
  });

  const handleProfileSave = () => {
    // Simulate save
    alert('Profile updated successfully!');
  };

  const handleNotificationsSave = () => {
    // Simulate save
    alert('Notification preferences updated!');
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1>Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
              <User className="w-5 h-5" />
            </div>
            <h3>Profile Information</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-2xl">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Your full name"
              />
              
              <Input
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Timezone
                </label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="input-field"
                >
                  <option>UTC-5 (EST)</option>
                  <option>UTC-6 (CST)</option>
                  <option>UTC-7 (MST)</option>
                  <option>UTC-8 (PST)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (CET)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Language
                </label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="input-field"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                onClick={handleProfileSave}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <h3>Appearance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose between light and dark theme
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                  ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                    ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current theme: <span className="font-medium capitalize">{theme}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
              <Bell className="w-5 h-5" />
            </div>
            <h3>Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email updates about your tasks
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                  ${notifications.emailNotifications ? 'bg-primary-600' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                    ${notifications.emailNotifications ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get push notifications on your device
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                  ${notifications.pushNotifications ? 'bg-primary-600' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                    ${notifications.pushNotifications ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium">Task Reminders</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Remind me about upcoming due dates
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, taskReminders: !notifications.taskReminders })}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                  ${notifications.taskReminders ? 'bg-primary-600' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                    ${notifications.taskReminders ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium">Weekly Report</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get a weekly summary of your productivity
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, weeklyReport: !notifications.weeklyReport })}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                  ${notifications.weeklyReport ? 'bg-primary-600' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                    ${notifications.weeklyReport ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                onClick={handleNotificationsSave}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-900/50">
          <h3 className="text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Export Data</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download all your data in JSON format
                </p>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
