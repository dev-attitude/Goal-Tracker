'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    content: "This platform has completely transformed how I approach trading. The goal tracking and analytics have helped me become more disciplined and profitable.",
    author: "Sarah Chen",
    role: "Professional Forex Trader",
    image: "/images/avatars/trader1.png",
    rating: 5,
    metrics: {
      profit: "+127%",
      period: "Last Quarter"
    }
  },
  {
    id: 2,
    content: "The best trading journal I've ever used. The insights and analytics have helped me identify and eliminate bad trading habits.",
    author: "Michael Rodriguez",
    role: "Day Trader",
    image: "/images/avatars/trader2.png",
    rating: 5,
    metrics: {
      profit: "+85%",
      period: "Win Rate"
    }
  },
  {
    id: 3,
    content: "Finally, a platform that helps me stay accountable to my trading goals. The progress tracking features are simply outstanding.",
    author: "Emma Thompson",
    role: "Swing Trader",
    image: "/images/avatars/trader3.png",
    rating: 5,
    metrics: {
      profit: "$12.4k",
      period: "Monthly Avg"
    }
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-gray-50">
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
              Trusted by Successful Traders
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of traders who have transformed their trading journey
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Card */}
              <div className="h-full p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-[#3e7be8]" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-600 mb-6">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="absolute top-8 right-8 text-right">
                  <div className="text-xl font-bold text-[#3e7be8]">{testimonial.metrics.profit}</div>
                  <div className="text-sm text-gray-500">{testimonial.metrics.period}</div>
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
          <div className="inline-flex items-center justify-center px-6 py-3 bg-[#3e7be8]/10 rounded-xl">
            <span className="text-[#3e7be8] font-medium">Join 10,000+ traders who trust our platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 