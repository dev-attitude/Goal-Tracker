'use client';

import { FC, useState } from 'react';
import TradeTable from '@/components/journal/TradeTable';
import TradeFilter from '@/components/journal/TradeFilter';
import TradeForm from '@/components/journal/TradeForm';
import { Trade, TradeFilter as FilterType } from '@/lib/types/trade';
import { PlusIcon } from '@heroicons/react/24/solid';

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
  {
    id: '2',
    date: new Date(),
    pair: 'GBPUSD',
    type: 'SHORT',
    strategy: 'REVERSAL',
    entryPrice: 1.25432,
    exitPrice: 1.25321,
    stopLoss: 1.25500,
    takeProfit: 1.25300,
    lotSize: 0.5,
    status: 'CLOSED',
    outcome: 'WIN',
    pnl: 55.5,
    pips: 11.1,
    notes: 'Price action reversal at resistance',
    tags: ['reversal', 'resistance'],
    linkedGoals: ['weekly-win-rate'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const JournalPage: FC = () => {
  const [trades, setTrades] = useState<Trade[]>(sampleTrades);
  const [filter, setFilter] = useState<FilterType>({});
  const [isTradeFormOpen, setIsTradeFormOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | undefined>(undefined);

  const filteredTrades = trades.filter((trade) => {
    // Date range filter
    if (filter.dateRange?.start && new Date(trade.date) < filter.dateRange.start) return false;
    if (filter.dateRange?.end && new Date(trade.date) > filter.dateRange.end) return false;

    // Pairs filter
    if (filter.pairs?.length && !filter.pairs.includes(trade.pair)) return false;

    // Strategies filter
    if (filter.strategies?.length && !filter.strategies.includes(trade.strategy)) return false;

    // Outcomes filter
    if (filter.outcomes?.length && !filter.outcomes.includes(trade.outcome)) return false;

    // Status filter
    if (filter.status?.length && !filter.status.includes(trade.status)) return false;

    return true;
  });

  const handleEditTrade = (trade: Trade) => {
    setSelectedTrade(trade);
    setIsTradeFormOpen(true);
  };

  const handleDeleteTrade = (tradeId: string) => {
    setTrades(trades.filter((trade) => trade.id !== tradeId));
  };

  const handleTradeSubmit = (data: Omit<Trade, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedTrade) {
      // Update existing trade
      setTrades(trades.map((trade) =>
        trade.id === selectedTrade.id
          ? {
              ...trade,
              ...data,
              updatedAt: new Date(),
            }
          : trade
      ));
    } else {
      // Add new trade
      const newTrade: Trade = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTrades([newTrade, ...trades]);
    }
    setIsTradeFormOpen(false);
    setSelectedTrade(undefined);
  };

  // Calculate statistics
  const calculateStats = () => {
    const closedTrades = trades.filter((trade) => trade.status === 'CLOSED');
    const winningTrades = closedTrades.filter((trade) => trade.outcome === 'WIN');
    const totalPnl = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const winRate = closedTrades.length > 0
      ? (winningTrades.length / closedTrades.length) * 100
      : 0;

    const profitFactor = closedTrades.reduce(
      (acc, trade) => {
        if (trade.pnl && trade.pnl > 0) acc.profits += trade.pnl;
        if (trade.pnl && trade.pnl < 0) acc.losses += Math.abs(trade.pnl);
        return acc;
      },
      { profits: 0, losses: 0 }
    );

    return {
      winRate: winRate.toFixed(1),
      profitFactor: profitFactor.losses > 0
        ? (profitFactor.profits / profitFactor.losses).toFixed(2)
        : '∞',
      totalPnl: totalPnl.toFixed(2),
      totalTrades: trades.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Trading Journal</h1>
            <p className="mt-2 text-gray-600">Track and analyze your trades</p>
          </div>
          <button
            onClick={() => {
              setSelectedTrade(undefined);
              setIsTradeFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Trade
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.winRate}%</p>
            <p className="text-sm text-gray-500">Closed trades</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Profit Factor</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.profitFactor}</p>
            <p className="text-sm text-gray-500">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total P/L</h3>
            <p className="text-2xl font-bold text-gray-900">${stats.totalPnl}</p>
            <p className="text-sm text-gray-500">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Trades</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTrades}</p>
            <p className="text-sm text-gray-500">All time</p>
          </div>
        </div>

        {/* Filters */}
        <TradeFilter filter={filter} onFilterChange={setFilter} />

        {/* Trade Table */}
        <TradeTable
          trades={filteredTrades}
          onEdit={handleEditTrade}
          onDelete={handleDeleteTrade}
        />

        {/* Trade Form Modal */}
        <TradeForm
          isOpen={isTradeFormOpen}
          onClose={() => {
            setIsTradeFormOpen(false);
            setSelectedTrade(undefined);
          }}
          onSubmit={handleTradeSubmit}
          initialData={selectedTrade}
        />
      </div>
    </div>
  );
};

export default JournalPage; 