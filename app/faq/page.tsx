'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I get started with Goal Tracker?",
        answer: "Getting started is easy! Simply sign up for a free account, set your first trading goal, and begin logging your trades. Our intuitive interface will guide you through the process."
      },
      {
        question: "Is my trading data secure?",
        answer: "Yes, we take security seriously. All your data is encrypted and stored securely. We use industry-standard security protocols and regular security audits to ensure your information is protected."
      },
      {
        question: "Can I import my existing trading data?",
        answer: "Yes! Our platform supports data import from major trading platforms including MetaTrader 4/5, TradingView, and more. You can also manually import data using our CSV template."
      }
    ]
  },
  {
    category: "Features & Pricing",
    questions: [
      {
        question: "What features are included in the free plan?",
        answer: "The free plan includes up to 3 trading goals, manual trade entries, basic performance metrics, daily journal entries, email support, and mobile app access."
      },
      {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer: "Yes, you can change your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, you'll retain access to your current features until the end of your billing period."
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team for a full refund."
      }
    ]
  },
  {
    category: "Platform & Integration",
    questions: [
      {
        question: "Which trading platforms do you support?",
        answer: "We support integration with MetaTrader 4/5, TradingView, cTrader, and several other major platforms. Check our documentation for the full list of supported platforms."
      },
      {
        question: "Is there a mobile app available?",
        answer: "Yes, we offer mobile apps for both iOS and Android devices. You can track your goals, log trades, and view analytics on the go."
      },
      {
        question: "Can I export my data?",
        answer: "Yes, you can export your data at any time in various formats including CSV, PDF, and Excel. This includes trade history, performance metrics, and journal entries."
      }
    ]
  },
  {
    category: "Support & Training",
    questions: [
      {
        question: "What kind of support do you offer?",
        answer: "We offer email support for all users, with priority support for Pro users and 24/7 support for Premium users. We also provide extensive documentation, video tutorials, and regular webinars."
      },
      {
        question: "Do you offer training on how to use the platform?",
        answer: "Yes, we provide comprehensive onboarding resources including video tutorials, documentation, and live webinars. Pro and Premium users also get access to advanced training sessions."
      },
      {
        question: "What is your average response time for support?",
        answer: "Free plan users typically receive responses within 24 hours. Pro users within 12 hours, and Premium users within 2 hours. Emergency issues are handled with priority."
      }
    ]
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      onClick={toggleOpen}
      className="w-full py-6 text-left flex justify-between items-center gap-4"
    >
      <span className="text-lg text-gray-900 font-medium">{question}</span>
      <ChevronDownIcon 
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-gray-600">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (category: string, question: string) => {
    const key = `${category}-${question}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our platform and services.
            </p>
          </motion.div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {section.category}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-200 shadow-sm">
                {section.questions.map((item) => (
                  <FAQItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openItems[`${section.category}-${item.question}`] || false}
                    toggleOpen={() => toggleItem(section.category, item.question)}
                  />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#3e7be8] text-white font-medium rounded-xl hover:bg-[#3e7be8]/90 transition-colors duration-200"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
} 