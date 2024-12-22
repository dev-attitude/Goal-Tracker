'use client';

import { Card } from "@/components/ui/card";
import {
  BellIcon,
  LinkIcon,
  UserCircleIcon,
  CreditCardIcon,
  KeyIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useState, FormEvent } from "react";

interface BrokerConfig {
  apiKey: string;
  server: string;
  platform: 'MT5' | 'cTrader' | null;
}

interface ProfileInfo {
  name: string;
  email: string;
  phone: string;
}

export default function SettingsPage() {
  const [brokerConnected, setBrokerConnected] = useState(false);
  const [brokerConfig, setBrokerConfig] = useState<BrokerConfig>({
    apiKey: '',
    server: '',
    platform: null
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    goalAlerts: true,
    tradeAlerts: false,
    weeklyReport: true,
    monthlyReport: true,
  });
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  });
  const [isEditing, setIsEditing] = useState({
    profile: false,
    broker: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleBrokerSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    // Validate broker configuration
    if (!brokerConfig.platform) {
      newErrors.platform = 'Please select a trading platform';
    }
    if (!brokerConfig.apiKey) {
      newErrors.apiKey = 'API Key is required';
    }
    if (!brokerConfig.server) {
      newErrors.server = 'Server address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes
    setBrokerConnected(true);
    setIsEditing({ ...isEditing, broker: false });
    setErrors({});
    // Here you would typically make an API call to save the configuration
    console.log('Saving broker configuration:', brokerConfig);
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    // Validate profile information
    if (!profileInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!profileInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileInfo.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes
    setIsEditing({ ...isEditing, profile: false });
    setErrors({});
    // Here you would typically make an API call to save the profile
    console.log('Saving profile information:', profileInfo);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    // Here you would typically make an API call to save the notification preferences
    console.log('Saving notification preferences');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Broker Integration */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Broker Integration</h3>
              <p className="mt-1 text-sm text-gray-500">Connect your trading accounts</p>
            </div>
            {!isEditing.broker && (
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  brokerConnected
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setIsEditing({ ...isEditing, broker: true })}
              >
                {brokerConnected ? "Disconnect" : "Connect"}
              </button>
            )}
          </div>

          {isEditing.broker && (
            <form onSubmit={handleBrokerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    brokerConfig.platform === 'MT5' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setBrokerConfig({ ...brokerConfig, platform: 'MT5' })}
                >
                  <div className="flex items-center space-x-3">
                    <img src="/mt5-logo.png" alt="MT5" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium">MetaTrader 5</h4>
                      <p className="text-sm text-gray-500">Connect your MT5 account</p>
                    </div>
                  </div>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    brokerConfig.platform === 'cTrader' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setBrokerConfig({ ...brokerConfig, platform: 'cTrader' })}
                >
                  <div className="flex items-center space-x-3">
                    <img src="/ctrader-logo.png" alt="cTrader" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium">cTrader</h4>
                      <p className="text-sm text-gray-500">Connect your cTrader account</p>
                    </div>
                  </div>
                </div>
              </div>
              {errors.platform && (
                <p className="text-sm text-red-600">{errors.platform}</p>
              )}

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">API Configuration</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">API Key</label>
                    <input
                      type="password"
                      value={brokerConfig.apiKey}
                      onChange={(e) => setBrokerConfig({ ...brokerConfig, apiKey: e.target.value })}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.apiKey ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your API key"
                    />
                    {errors.apiKey && (
                      <p className="mt-1 text-sm text-red-600">{errors.apiKey}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Server</label>
                    <input
                      type="text"
                      value={brokerConfig.server}
                      onChange={(e) => setBrokerConfig({ ...brokerConfig, server: e.target.value })}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.server ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., demo.broker.com"
                    />
                    {errors.server && (
                      <p className="mt-1 text-sm text-red-600">{errors.server}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing({ ...isEditing, broker: false });
                    setErrors({});
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          )}
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive mobile notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Alert Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Goal Achievement Alerts</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.goalAlerts}
                      onChange={() => handleNotificationChange('goalAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Trade Entry/Exit Alerts</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.tradeAlerts}
                      onChange={() => handleNotificationChange('tradeAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Report Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Weekly Performance Report</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReport}
                      onChange={() => handleNotificationChange('weeklyReport')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm">Monthly Performance Report</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.monthlyReport}
                      onChange={() => handleNotificationChange('monthlyReport')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Management */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Account Management</h3>
            <p className="mt-1 text-sm text-gray-500">Manage your account and subscription</p>
          </div>

          <div className="space-y-4">
            {isEditing.profile ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={profileInfo.name}
                    onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profileInfo.email}
                    onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={profileInfo.phone}
                    onChange={(e) => setProfileInfo({ ...profileInfo, phone: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing({ ...isEditing, profile: false });
                      setErrors({});
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <UserCircleIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Profile Information</p>
                      <p className="text-sm text-gray-500">{profileInfo.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing({ ...isEditing, profile: true })}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <KeyIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Password & Security</p>
                      <p className="text-sm text-gray-500">Manage your security settings</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">Change</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Subscription</p>
                      <p className="text-sm text-gray-500">Pro Plan - $19.99/month</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">Manage</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Data & Privacy</p>
                      <p className="text-sm text-gray-500">Manage your data preferences</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">View</button>
                </div>
              </>
            )}
          </div>

          <div className="pt-4 border-t">
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  console.log('Account deletion requested');
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
} 