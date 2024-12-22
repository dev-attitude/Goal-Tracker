'use client';

import { FC, useState } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import EquityChart from '@/components/dashboard/EquityChart';
import TradeEntryForm from '@/components/dashboard/TradeEntryForm';
import RiskCalculator from '@/components/dashboard/RiskCalculator';
import TradingJournalModal from '@/components/dashboard/TradingJournalModal';
import { Trade } from '@/lib/types/trade';
import { BookOpenIcon, ChartBarIcon, PlusIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Your trading overview and quick actions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsTradeFormOpen(true)}
              className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <PlusIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
              Quick Trade
            </button>
            <button
              onClick={() => setIsJournalModalOpen(true)}
              className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white text-gray-700 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <BookOpenIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
              Trading Journal
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 sm:space-y-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Equity Curve</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Your account growth over time</p>
                  </div>
                  <ChartBarIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <EquityChart data={equityData} />
              </div>
            </div>
          </div>

          {/* Right Column - Risk Calculator */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Risk Calculator</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Calculate your position size</p>
              </div>
              <div className="p-4 sm:p-6">
                <RiskCalculator />
              </div>
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