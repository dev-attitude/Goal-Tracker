import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  description?: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, change, trend, description }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{value}</h3>
              </div>
              {trend && change && (
                <div 
                  className={`flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                    trend === 'up' 
                      ? 'text-green-700 bg-green-50 ring-1 ring-green-100/50' 
                      : 'text-red-700 bg-red-50 ring-1 ring-red-100/50'
                  }`}
                >
                  {trend === 'up' ? (
                    <ArrowUpIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="text-xs sm:text-sm font-medium ml-0.5 sm:ml-1">{change}%</span>
                </div>
              )}
            </div>
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 font-medium">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard; 