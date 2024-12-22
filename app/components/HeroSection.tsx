'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ChartBarIcon, ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  const features = [
    { title: 'Track Your Goals', icon: ChartBarIcon },
    { title: 'Monitor Performance', icon: ArrowTrendingUpIcon },
    { title: 'Stay Consistent', icon: CheckCircleIcon },
  ];

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-40 -right-40 rounded-full bg-[#3e7be8]/5" />
        <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 rounded-full bg-[#3e7be8]/5" />
        <div className="absolute inset-0 bg-[url('/images/chart-pattern.svg')] bg-repeat opacity-[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master Your Trading Journey with{' '}
                <span className="text-[#3e7be8]">Smart Goals</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
                Track your trades, analyze performance, and achieve consistent results with our comprehensive trading journal.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/dashboard">
                <button className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#3e7be8] text-white text-lg font-semibold rounded-xl hover:bg-[#3e7be8]/90 transition-all duration-200 shadow-lg shadow-[#3e7be8]/20">
                  Get Started Free
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="#features">
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-700 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-gray-200">
                  Learn More
                </button>
              </Link>
            </motion.div>

            {/* Quick Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <feature.icon className="w-6 h-6 text-[#3e7be8]" />
                  <span className="text-gray-700 font-medium">{feature.title}</span>
                </div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-8"
            >
              <div className="space-y-1">
                <div className="text-2xl font-bold text-[#3e7be8]">10,000+</div>
                <div className="text-sm text-gray-600">Active Traders</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-[#3e7be8]">1M+</div>
                <div className="text-sm text-gray-600">Trades Tracked</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-[#3e7be8]">89%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px]"
          >
            {/* Main Dashboard Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-200/50 bg-white">
              <Image
                src="/images/dashboard-preview.png"
                alt="Trading Dashboard Preview"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              
              {/* Floating Stats Cards */}
              <motion.div
                animate={{ y: [-10, 10], x: [-5, 5] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-8 right-8 bg-white rounded-lg p-4 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Win Rate</div>
                    <div className="text-lg font-bold text-[#3e7be8]">78.5%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10], x: [5, -5] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                className="absolute bottom-8 left-8 bg-white rounded-lg p-4 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#3e7be8] animate-pulse" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Monthly Profit</div>
                    <div className="text-lg font-bold text-green-500">+$4,550</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 transform translate-x-4 translate-y-4">
              <div className="absolute inset-0 bg-[#3e7be8]/5 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 