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
  ReferenceLine,
} from 'recharts';

const data = [
  { risk: 1, reward: 2.5, trades: 5 },
  { risk: 1.2, reward: 1.8, trades: 3 },
  { risk: 0.8, reward: 1.6, trades: 4 },
  { risk: 1.5, reward: 3, trades: 2 },
  { risk: 0.5, reward: 1, trades: 6 },
  { risk: 2, reward: 4, trades: 1 },
  { risk: 1.3, reward: 2.2, trades: 4 },
  { risk: 0.7, reward: 1.4, trades: 5 },
  { risk: 1.1, reward: 2.8, trades: 3 },
  { risk: 0.9, reward: 1.9, trades: 4 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
        <p className="text-sm font-medium">Risk: ${data.risk}</p>
        <p className="text-sm font-medium">Reward: ${data.reward}</p>
        <p className="text-sm text-gray-500">Trades: {data.trades}</p>
      </div>
    );
  }
  return null;
};

const RiskAnalysisChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="risk"
          name="Risk"
          unit="$"
          domain={[0, 'auto']}
        />
        <YAxis
          type="number"
          dataKey="reward"
          name="Reward"
          unit="$"
          domain={[0, 'auto']}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={1}
          stroke="#EF4444"
          strokeDasharray="3 3"
          label={{ value: '1:1 Risk-Reward', position: 'left' }}
        />
        <Scatter
          name="Risk-Reward"
          data={data}
          fill="#3B82F6"
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default RiskAnalysisChart; 