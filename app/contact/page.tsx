'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
  TwitterIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/ui/icons';
import Navbar from '../components/Navbar';

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    Icon: TwitterIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    Icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    Icon: LinkedInIcon,
  },
];

const contactInfo = [
  {
    Icon: EnvelopeIcon,
    label: 'Email',
    value: 'support@goaltracker.com',
    href: 'mailto:support@goaltracker.com',
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    Icon: MapPinIcon,
    label: 'Office',
    value: '123 Trading Street, San Francisco, CA 94105',
    href: 'https://maps.google.com',
  },
  {
    Icon: GlobeAltIcon,
    label: 'Website',
    value: 'www.goaltracker.com',
    href: 'https://www.goaltracker.com',
  },
];

export default function ContactPage() {
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3e7be8] focus:border-transparent transition-colors duration-200"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3e7be8] focus:border-transparent transition-colors duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3e7be8] focus:border-transparent transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3e7be8] focus:border-transparent transition-colors duration-200"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3e7be8] focus:border-transparent transition-colors duration-200"
                    placeholder="Your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#3e7be8] text-white font-medium rounded-xl hover:bg-[#3e7be8]/90 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 text-gray-600 hover:text-[#3e7be8] transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.Icon className="w-6 h-6 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p>{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:text-[#3e7be8] hover:border-[#3e7be8] transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 