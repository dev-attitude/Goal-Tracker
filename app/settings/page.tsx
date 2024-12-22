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
  Cog6ToothIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

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
    name: 'Sketchy Gazzy',
    email: 'gazzy@example.com',
    phone: '+264(81) 234 5678'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Settings
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Broker Integration */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Broker Integration</h3>
                    <p className="text-sm text-gray-500">Connect your trading accounts</p>
                  </div>
                </div>
                {!isEditing.broker && (
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      brokerConnected
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                    onClick={() => setIsEditing({ ...isEditing, broker: true })}
                  >
                    {brokerConnected ? (
                      <>Disconnect</>
                    ) : (
                      <>
                        Connect
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {isEditing.broker && (
                <form onSubmit={handleBrokerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                        brokerConfig.platform === 'MT5' 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setBrokerConfig({ ...brokerConfig, platform: 'MT5' })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img src="/mt5-logo.png" alt="MT5" className="w-8 h-8" />
                          {brokerConfig.platform === 'MT5' && (
                            <CheckCircleIcon className="w-4 h-4 text-blue-500 absolute -top-1 -right-1" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">MetaTrader 5</h4>
                          <p className="text-sm text-gray-500">Connect your MT5 account</p>
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                        brokerConfig.platform === 'cTrader' 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setBrokerConfig({ ...brokerConfig, platform: 'cTrader' })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img src="/ctrader-logo.png" alt="cTrader" className="w-8 h-8" />
                          {brokerConfig.platform === 'cTrader' && (
                            <CheckCircleIcon className="w-4 h-4 text-blue-500 absolute -top-1 -right-1" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">cTrader</h4>
                          <p className="text-sm text-gray-500">Connect your cTrader account</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {errors.platform && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                      {errors.platform}
                    </p>
                  )}

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <KeyIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <h4 className="font-medium">API Configuration</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">API Key</label>
                        <div className="relative">
                          <input
                            type="password"
                            value={brokerConfig.apiKey}
                            onChange={(e) => setBrokerConfig({ ...brokerConfig, apiKey: e.target.value })}
                            className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.apiKey ? 'border-red-300' : 'border-gray-200'
                            }`}
                            placeholder="Enter your API key"
                          />
                          {errors.apiKey && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                              {errors.apiKey}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Server</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={brokerConfig.server}
                            onChange={(e) => setBrokerConfig({ ...brokerConfig, server: e.target.value })}
                            className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.server ? 'border-red-300' : 'border-gray-200'
                            }`}
                            placeholder="e.g., demo.broker.com"
                          />
                          {errors.server && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                              {errors.server}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing({ ...isEditing, broker: false });
                        setErrors({});
                      }}
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <BellIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                  <p className="text-sm text-gray-500">Manage your notification settings</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      {key === 'email' && <EnvelopeIcon className="w-5 h-5 text-gray-400" />}
                      {key === 'push' && <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'push' && 'Receive push notifications'}
                          {key === 'goalAlerts' && 'Get notified about goal progress'}
                          {key === 'tradeAlerts' && 'Get notified about trade updates'}
                          {key === 'weeklyReport' && 'Receive weekly performance report'}
                          {key === 'monthlyReport' && 'Receive monthly performance report'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <UserCircleIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                    <p className="text-sm text-gray-500">Update your personal information</p>
                  </div>
                </div>
                {!isEditing.profile && (
                  <button
                    onClick={() => setIsEditing({ ...isEditing, profile: true })}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center gap-2"
                  >
                    Edit Profile
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing.profile ? (
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={profileInfo.name}
                        onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.name ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={profileInfo.email}
                        onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={profileInfo.phone}
                        onChange={(e) => setProfileInfo({ ...profileInfo, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing({ ...isEditing, profile: false });
                        setErrors({});
                      }}
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <UserCircleIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{profileInfo.name}</p>
                      <p className="text-xs text-gray-500">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{profileInfo.email}</p>
                      <p className="text-xs text-gray-500">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{profileInfo.phone}</p>
                      <p className="text-xs text-gray-500">Phone Number</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                  <ShieldCheckIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                  <p className="text-sm text-gray-500">Manage your security preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <KeyIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <CreditCardIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">API Access</p>
                      <p className="text-xs text-gray-500">Manage API keys and permissions</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 