import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  description?: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, change, trend, description }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          </div>
          {trend && change && (
            <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
              <span className="text-sm font-medium ml-1">{change}%</span>
            </div>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard; 