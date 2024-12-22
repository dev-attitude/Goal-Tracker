'use client';

import { FC } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: '2024-01-01', equity: 10000 },
  { date: '2024-01-02', equity: 10250 },
  { date: '2024-01-03', equity: 10150 },
  { date: '2024-01-04', equity: 10450 },
  { date: '2024-01-05', equity: 10380 },
  { date: '2024-01-06', equity: 10580 },
  { date: '2024-01-07', equity: 10780 },
  { date: '2024-01-08', equity: 11100 },
  { date: '2024-01-09', equity: 10950 },
  { date: '2024-01-10', equity: 11250 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="text-sm text-gray-500">
          {new Date(label).toLocaleDateString()}
        </p>
        <p className="text-sm font-medium text-gray-900">
          Balance: ${payload[0].value.toLocaleString()}
        </p>
        {payload[0].payload.change && (
          <p className={`text-sm font-medium ${payload[0].payload.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            Change: {payload[0].payload.change > 0 ? '+' : ''}{payload[0].payload.change}%
          </p>
        )}
      </div>
    );
  }
  return null;
};

const EquityCurveChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          domain={['dataMin - 1000', 'dataMax + 1000']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="equity"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#colorEquity)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EquityCurveChart; 