import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection: FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/path-to-chart-overlay.png)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Achieve Trading Mastery with Smart Goals & Insights
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Track your goals, log your trades, and analyze performance to become a better trader.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition">
            Get Started Free
          </button>
          <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-900 transition">
            Learn More
          </button>
        </div>

        {/* Hero Image/Animation */}
        <div className="mt-12">
          <Image
            src="/path-to-dashboard-mockup.png"
            alt="Dashboard Mockup"
            width={800}
            height={400}
            className="mx-auto"
          />
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex justify-center space-x-8">
          <Image src="/path-to-broker-logo1.png" alt="Broker 1" width={100} height={50} />
          <Image src="/path-to-broker-logo2.png" alt="Broker 2" width={100} height={50} />
          <Image src="/path-to-broker-logo3.png" alt="Broker 3" width={100} height={50} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 