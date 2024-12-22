import { FC } from 'react';
import { Modal, ModalContent } from '@/components/ui/modal';
import { Trade } from '@/lib/types/trade';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface TradingJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  trades: Trade[];
}

const TradingJournalModal: FC<TradingJournalModalProps> = ({ isOpen, onClose, trades }) => {
  // Calculate statistics
  const calculateStats = () => {
    const closedTrades = trades.filter((trade) => trade.status === 'CLOSED');
    const winningTrades = closedTrades.filter((trade) => trade.outcome === 'WIN');
    const totalPnl = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const winRate = closedTrades.length > 0
      ? (winningTrades.length / closedTrades.length) * 100
      : 0;

    return {
      winRate: winRate.toFixed(1),
      totalPnl: totalPnl.toFixed(2),
      totalTrades: trades.length,
      closedTrades: closedTrades.length,
    };
  };

  const stats = calculateStats();

  // Get recent trades (last 5)
  const recentTrades = trades.slice(0, 5);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl bg-white rounded-xl shadow-xl">
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Trading Journal Overview</h2>
              <Link
                href="/journal"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Full Journal →
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.winRate}%</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500">Total P/L</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  ${stats.totalPnl}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Trades</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.totalTrades}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-500">Closed Trades</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.closedTrades}</p>
              </div>
            </div>

            {/* Recent Trades */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Trades</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">P/L</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTrades.map((trade) => (
                      <tr key={trade.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {trade.date.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{trade.pair}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              trade.type === 'LONG'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {trade.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              trade.status === 'OPEN'
                                ? 'bg-blue-100 text-blue-800'
                                : trade.status === 'CLOSED'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {trade.status}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-sm text-right font-medium ${
                          trade.pnl && trade.pnl > 0
                            ? 'text-green-600'
                            : trade.pnl && trade.pnl < 0
                            ? 'text-red-600'
                            : 'text-gray-900'
                        }`}>
                          ${trade.pnl?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default TradingJournalModal; 