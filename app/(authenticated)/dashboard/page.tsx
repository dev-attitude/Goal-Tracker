'use client';

import { FC, useState } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import EquityChart from '@/components/dashboard/EquityChart';
import TradeEntryForm from '@/components/dashboard/TradeEntryForm';
import RiskCalculator from '@/components/dashboard/RiskCalculator';
import TradingJournalModal from '@/components/dashboard/TradingJournalModal';
import { Trade } from '@/lib/types/trade';
import { BookOpenIcon } from '@heroicons/react/24/outline';

// Sample data - replace with real data later
const sampleTrades: Trade[] = [
  {
    id: '1',
    date: new Date(),
    pair: 'EURUSD',
    type: 'LONG',
    strategy: 'TREND_FOLLOWING',
    entryPrice: 1.05123,
    exitPrice: 1.05234,
    stopLoss: 1.05000,
    takeProfit: 1.05300,
    lotSize: 1,
    status: 'CLOSED',
    outcome: 'WIN',
    pnl: 111,
    pips: 11.1,
    notes: 'Strong trend continuation trade',
    tags: ['trend', 'continuation'],
    linkedGoals: ['monthly-profit'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Sample equity data
const equityData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1} Dec`,
  value: 10000 + Math.random() * 5000,
}));

// Type for quick trade entry form
type QuickTradeFormData = {
  symbol: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  notes?: string;
};

const DashboardPage: FC = () => {
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isTradeFormOpen, setIsTradeFormOpen] = useState(false);

  const handleTradeSubmit = (data: QuickTradeFormData) => {
    // Transform quick trade data to full trade data
    const newTrade: Omit<Trade, 'id' | 'createdAt' | 'updatedAt'> = {
      date: new Date(),
      pair: data.symbol,
      type: data.type,
      strategy: 'OTHER', // Default strategy for quick trades
      entryPrice: data.entryPrice,
      stopLoss: data.stopLoss,
      takeProfit: data.takeProfit,
      lotSize: data.size,
      status: 'OPEN',
      outcome: 'PENDING',
      notes: data.notes || '',
      tags: [],
      linkedGoals: [],
      pnl: 0,
      pips: 0,
    };

    console.log('New trade:', newTrade);
    // TODO: Implement trade submission logic
    setIsTradeFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Your trading overview and quick actions</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsTradeFormOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              <span className="text-xl mr-2">+</span>
              Quick Trade
            </button>
            <button
              onClick={() => setIsJournalModalOpen(true)}
              className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Trading Journal
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Win Rate"
            value="65%"
            description="Last 30 days"
            trend="up"
            change={5}
          />
          <StatsCard
            title="Total P/L"
            value="$2,345"
            description="Last 30 days"
            trend="up"
            change={12}
          />
          <StatsCard
            title="Average RRR"
            value="1.5"
            description="Risk-Reward Ratio"
            trend="down"
            change={0.2}
          />
          <StatsCard
            title="Total Trades"
            value="28"
            description="Last 30 days"
            trend="up"
            change={8}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Equity Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h2>
              <EquityChart data={equityData} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Risk Calculator */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Calculator</h2>
              <RiskCalculator />
            </div>
          </div>
        </div>

        {/* Modals */}
        <TradeEntryForm
          isOpen={isTradeFormOpen}
          onClose={() => setIsTradeFormOpen(false)}
          onSubmit={handleTradeSubmit}
        />
        <TradingJournalModal
          isOpen={isJournalModalOpen}
          onClose={() => setIsJournalModalOpen(false)}
          trades={sampleTrades}
        />
      </div>
    </div>
  );
};

export default DashboardPage; 