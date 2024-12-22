'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Perfect for getting started with goal tracking and basic trade journaling.',
    features: [
      'Up to 3 trading goals',
      'Manual trade entries',
      'Basic performance metrics',
      'Daily journal entries',
      'Email support',
      'Mobile app access',
    ],
    cta: 'Get Started',
    href: '/dashboard',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/per month',
    description: 'Everything you need for serious trading performance improvement.',
    features: [
      'Unlimited trading goals',
      'Automated trade syncing',
      'Advanced analytics dashboard',
      'Custom metrics tracking',
      'Priority email support',
      'Trading strategy backtesting',
      'Risk management tools',
      'Performance reports',
    ],
    cta: 'Start Pro Trial',
    href: '/dashboard',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$79',
    period: '/per month',
    description: 'Advanced features for professional traders and institutions.',
    features: [
      'Everything in Pro plan',
      'AI-powered trade insights',
      'Advanced risk analytics',
      'Custom API access',
      '24/7 priority support',
      'Team collaboration tools',
      'White-label options',
      'Personal success manager',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your trading journey. No hidden fees.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="bg-[#3e7be8] text-white text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card */}
                <div 
                  className={`h-full p-8 bg-white rounded-3xl ${
                    plan.popular 
                      ? 'border-2 border-[#3e7be8]' 
                      : 'border border-gray-200'
                  } transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}
                >
                  {/* Plan Name & Price */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    <p className="mt-4 text-gray-600">{plan.description}</p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-[#3e7be8] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-8">
                    <Link href={plan.href} className="block">
                      <button 
                        className={`w-full py-3 px-6 rounded-xl font-medium text-center transition-all duration-300 ${
                          plan.popular
                            ? 'bg-[#3e7be8] text-white hover:bg-[#3e7be8]/90'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {plan.cta}
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Link */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Have questions? Check out our{' '}
              <Link href="/faq" className="text-[#3e7be8] hover:text-[#3e7be8]/90">
                FAQ
              </Link>
              {' '}or{' '}
              <Link href="/contact" className="text-[#3e7be8] hover:text-[#3e7be8]/90">
                contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 