'use client';

import { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

const data = [
  { pair: 'EUR/USD', profit: 1250, trades: 45, winRate: 68 },
  { pair: 'GBP/USD', profit: 850, trades: 32, winRate: 62 },
  { pair: 'USD/JPY', profit: -320, trades: 28, winRate: 43 },
  { pair: 'AUD/USD', profit: 580, trades: 25, winRate: 56 },
  { pair: 'USD/CAD', profit: -150, trades: 20, winRate: 45 },
  { pair: 'EUR/GBP', profit: 420, trades: 18, winRate: 61 },
].sort((a, b) => b.profit - a.profit);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className={`text-sm font-medium ${data.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          P/L: ${data.profit}
        </p>
        <p className="text-sm text-gray-600">Win Rate: {data.winRate}%</p>
        <p className="text-sm text-gray-600">Total Trades: {data.trades}</p>
      </div>
    );
  }
  return null;
};

const PairPerformanceChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="pair" />
        <YAxis
          tickFormatter={(value) => `$${value}`}
          label={{ value: 'Profit/Loss ($)', angle: -90, position: 'insideLeft', offset: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#666" />
        <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#22C55E' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PairPerformanceChart; 