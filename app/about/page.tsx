'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

const values = [
  {
    title: 'Innovation',
    description: 'Continuously pushing boundaries to provide cutting-edge trading tools and analytics.',
    icon: LightBulbIcon,
  },
  {
    title: 'Security',
    description: 'Your data security is our top priority, with enterprise-grade protection.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Community',
    description: 'Building a supportive community of traders helping each other succeed.',
    icon: UserGroupIcon,
  },
  {
    title: 'Excellence',
    description: 'Committed to delivering the highest quality trading tools and experience.',
    icon: ChartBarIcon,
  },
  {
    title: 'Growth',
    description: 'Empowering traders to achieve their goals and reach new heights.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Support',
    description: 'Dedicated to providing exceptional support to our trading community.',
    icon: HeartIcon,
  },
];

const stats = [
  { label: 'Active Users', value: '10,000+' },
  { label: 'Trades Tracked', value: '1M+' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Countries', value: '50+' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              About Goal Tracker
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Empowering traders to achieve their goals through advanced analytics, 
              comprehensive tracking, and data-driven insights.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#3e7be8]/5 to-[#3e7be8]/10 rounded-3xl p-8 sm:p-12 mb-16"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Goal Tracker, we're on a mission to revolutionize how traders track, analyze, 
                and improve their trading performance. We believe that success in trading comes 
                from disciplined goal setting, meticulous tracking, and data-driven decision making. 
                Our platform is designed to empower traders of all levels to achieve their full potential.
              </p>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-[#3e7be8]/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[#3e7be8]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 mb-16"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[#3e7be8] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of traders who are already using Goal Tracker to improve their trading performance.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#3e7be8] text-white font-medium rounded-xl hover:bg-[#3e7be8]/90 transition-colors duration-200"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
} 