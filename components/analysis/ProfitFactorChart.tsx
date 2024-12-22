'use client';

import { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const data = [
  { date: '2024-01-01', profitFactor: 1.2 },
  { date: '2024-01-02', profitFactor: 1.5 },
  { date: '2024-01-03', profitFactor: 1.3 },
  { date: '2024-01-04', profitFactor: 1.8 },
  { date: '2024-01-05', profitFactor: 1.6 },
  { date: '2024-01-06', profitFactor: 2.1 },
  { date: '2024-01-07', profitFactor: 1.9 },
];

const ProfitFactorChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => new Date(value).toLocaleDateString()}
          formatter={(value: number) => [value.toFixed(2), 'Profit Factor']}
        />
        <ReferenceLine y={1} stroke="#EF4444" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="profitFactor"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: '#3B82F6', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitFactorChart; 