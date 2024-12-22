'use client';

import { FC, useState } from 'react';
import TradeTable from '@/components/journal/TradeTable';
import TradeFilter from '@/components/journal/TradeFilter';
import TradeForm from '@/components/journal/TradeForm';
import { Trade, TradeFilter as FilterType } from '@/lib/types/trade';
import { 
  PlusIcon, 
  ChartBarIcon, 
  ScaleIcon, 
  BanknotesIcon, 
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

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
      trend: totalPnl > 0 ? 'up' : 'down'
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Trading Journal
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Track and analyze your trades</p>
        </div>
        <div className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedTrade(undefined);
              setIsTradeFormOpen(true);
            }}
            className="relative group flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl transition-all duration-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_5px_15px_-3px_rgba(59,130,246,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgb(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              <div className="p-1 bg-white/10 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180">
                <PlusIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </div>
              <span className="text-sm sm:text-base font-semibold">New Trade</span>
              <PencilSquareIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl">
                <ChartBarIcon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              {stats.trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Win Rate</h3>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.winRate}%</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Closed trades</p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl">
                <ScaleIcon className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Profit Factor</h3>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.profitFactor}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">All time</p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl">
                <BanknotesIcon className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total P/L</h3>
            <p className={`text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 ${Number(stats.totalPnl) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${stats.totalPnl}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">All time</p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg sm:rounded-xl">
                <ClipboardDocumentListIcon className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Trades</h3>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.totalTrades}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">All time</p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <TradeFilter filter={filter} onFilterChange={setFilter} />
        </div>
      </motion.div>

      {/* Trade Table */}
      <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <TradeTable
              trades={filteredTrades}
              onEdit={handleEditTrade}
              onDelete={handleDeleteTrade}
            />
          </div>
        </div>
      </motion.div>

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
  );
};

export default JournalPage; 