'use client';

import { FC } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  // Winning trades
  { duration: 15, profit: 150, type: 'win' },
  { duration: 45, profit: 250, type: 'win' },
  { duration: 120, profit: 180, type: 'win' },
  { duration: 30, profit: 320, type: 'win' },
  { duration: 60, profit: 200, type: 'win' },
  // Losing trades
  { duration: 180, profit: -120, type: 'loss' },
  { duration: 90, profit: -80, type: 'loss' },
  { duration: 150, profit: -150, type: 'loss' },
  { duration: 75, profit: -100, type: 'loss' },
  { duration: 45, profit: -90, type: 'loss' },
];

const winningTrades = data.filter(trade => trade.type === 'win');
const losingTrades = data.filter(trade => trade.type === 'loss');

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
        <p className="text-sm font-medium">Duration: {data.duration} min</p>
        <p className={`text-sm font-medium ${data.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
          P/L: ${data.profit}
        </p>
      </div>
    );
  }
  return null;
};

const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
};

const TradeDurationChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="duration"
          name="Duration"
          unit=" min"
          tickFormatter={formatDuration}
          label={{ value: 'Duration', position: 'bottom', offset: 0 }}
        />
        <YAxis
          type="number"
          dataKey="profit"
          name="P/L"
          unit="$"
          label={{ value: 'Profit/Loss ($)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Scatter
          name="Winning Trades"
          data={winningTrades}
          fill="#22C55E"
          shape="circle"
        />
        <Scatter
          name="Losing Trades"
          data={losingTrades}
          fill="#EF4444"
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default TradeDurationChart; 