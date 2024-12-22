'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, showAuthModal, signOut } = useAuth();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      showAuthModal();
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Goal Tracker
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? 'text-[#3e7be8]'
                    : 'text-gray-500 hover:text-gray-900'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                onClick={handleDashboardClick}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-[#3e7be8] hover:bg-[#3e7be8]/90 transition-colors duration-200"
              >
                {isAuthenticated ? 'Dashboard' : 'Get Started'}
              </Link>

              {isAuthenticated && (
                <button
                  onClick={signOut}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sm:hidden bg-white border-b border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'text-[#3e7be8] bg-[#3e7be8]/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/dashboard"
              onClick={handleDashboardClick}
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#3e7be8] hover:bg-[#3e7be8]/90 transition-colors duration-200"
            >
              {isAuthenticated ? 'Dashboard' : 'Get Started'}
            </Link>

            {isAuthenticated && (
              <button
                onClick={signOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              >
                Sign Out
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
} 