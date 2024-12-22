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
} from 'recharts';

const data = [
  { hour: '00:00', trades: 4 },
  { hour: '03:00', trades: 6 },
  { hour: '06:00', trades: 8 },
  { hour: '09:00', trades: 15 },
  { hour: '12:00', trades: 12 },
  { hour: '15:00', trades: 18 },
  { hour: '18:00', trades: 10 },
  { hour: '21:00', trades: 5 },
];

const TradeDistributionChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="trades" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TradeDistributionChart; 