'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChartBarIcon,
  ArrowPathIcon,
  PresentationChartLineIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Smart Goal Tracking',
    description: 'Set, monitor, and achieve your trading goals with our intelligent tracking system.',
    icon: ChartBarIcon,
    color: 'from-blue-500/10 to-blue-600/10',
    stats: '90% Goal Achievement',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Get instant insights into your trading performance with live analytics.',
    icon: ArrowPathIcon,
    color: 'from-green-500/10 to-green-600/10',
    stats: 'Live Updates',
  },
  {
    title: 'Performance Metrics',
    description: 'Track key performance indicators and improve your trading strategy.',
    icon: PresentationChartLineIcon,
    color: 'from-purple-500/10 to-purple-600/10',
    stats: '12+ Metrics',
  },
  {
    title: 'Trade Journal',
    description: 'Log and analyze your trades with our comprehensive journaling system.',
    icon: ClockIcon,
    color: 'from-orange-500/10 to-orange-600/10',
    stats: '1M+ Trades Logged',
  },
  {
    title: 'Risk Management',
    description: 'Optimize your risk-reward ratio and protect your trading capital.',
    icon: ArrowTrendingUpIcon,
    color: 'from-red-500/10 to-red-600/10',
    stats: 'Smart Analysis',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time with detailed progress reports.',
    icon: CheckBadgeIcon,
    color: 'from-teal-500/10 to-teal-600/10',
    stats: 'Daily Updates',
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features designed to help you become a better trader
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3e7be8]/10 mb-4">
                    <feature.icon className="w-6 h-6 text-[#3e7be8]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center text-sm font-medium text-[#3e7be8]">
                    {feature.stats}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <Link href="/dashboard">
            <button className="inline-flex items-center justify-center px-8 py-3.5 bg-[#3e7be8] text-white text-lg font-semibold rounded-xl hover:bg-[#3e7be8]/90 transition-all duration-200 shadow-lg shadow-[#3e7be8]/20">
              Start Trading Smarter
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection; 