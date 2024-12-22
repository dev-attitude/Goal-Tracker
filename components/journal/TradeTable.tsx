import { FC, useState } from 'react';
import { format } from 'date-fns';
import { Trade, TradeOutcome } from '@/lib/types/trade';
import { Card } from '@/components/ui/card';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PencilIcon,
  TrashIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface TradeTableProps {
  trades: Trade[];
  onEdit?: (trade: Trade) => void;
  onDelete?: (tradeId: string) => void;
}

type SortField = 'date' | 'pair' | 'type' | 'pnl' | 'pips';
type SortDirection = 'asc' | 'desc';

const TradeTable: FC<TradeTableProps> = ({ trades, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedTrade, setExpandedTrade] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedTrades = [...trades].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'date':
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction;
      case 'pair':
        return a.pair.localeCompare(b.pair) * direction;
      case 'type':
        return a.type.localeCompare(b.type) * direction;
      case 'pnl':
        return ((a.pnl || 0) - (b.pnl || 0)) * direction;
      case 'pips':
        return ((a.pips || 0) - (b.pips || 0)) * direction;
      default:
        return 0;
    }
  });

  const getOutcomeColor = (outcome: TradeOutcome) => {
    switch (outcome) {
      case 'WIN':
        return 'text-green-500';
      case 'LOSS':
        return 'text-red-500';
      case 'BREAKEVEN':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  // Mobile view for each trade
  const MobileTradeCard = ({ trade }: { trade: Trade }) => {
    const isExpanded = expandedTrade === trade.id;

    return (
      <div className="p-4 border-b border-gray-200 last:border-b-0">
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => setExpandedTrade(isExpanded ? null : trade.id)}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{trade.pair}</span>
              <span className={`text-xs font-medium ${trade.type === 'LONG' ? 'text-green-600' : 'text-red-600'}`}>
                {trade.type}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {format(new Date(trade.date), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-sm font-medium ${trade.pnl && trade.pnl > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${trade.pnl?.toFixed(2) || '-'}
              </div>
              <div className="text-xs text-gray-500">
                {trade.pips?.toFixed(1) || '-'} pips
              </div>
            </div>
            <ChevronRightIcon 
              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-medium text-gray-500">Entry Price</div>
                <div className="text-gray-900">{trade.entryPrice.toFixed(5)}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">Exit Price</div>
                <div className="text-gray-900">{trade.exitPrice?.toFixed(5) || '-'}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">Status</div>
                <div className={getOutcomeColor(trade.outcome)}>{trade.outcome}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">Strategy</div>
                <div className="text-gray-900">{trade.strategy}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(trade);
                }}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(trade.id);
                }}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      {/* Mobile View */}
      <div className="sm:hidden divide-y divide-gray-200">
        {sortedTrades.map((trade) => (
          <MobileTradeCard key={trade.id} trade={trade} />
        ))}
        {sortedTrades.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">
            No trades found
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('pair')}
              >
                <div className="flex items-center space-x-1">
                  <span>Pair</span>
                  {sortField === 'pair' && (
                    sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  {sortField === 'type' && (
                    sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exit
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('pnl')}
              >
                <div className="flex items-center space-x-1">
                  <span>P/L</span>
                  {sortField === 'pnl' && (
                    sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('pips')}
              >
                <div className="flex items-center space-x-1">
                  <span>Pips</span>
                  {sortField === 'pips' && (
                    sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTrades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(trade.date), 'MMM dd, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trade.pair}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={trade.type === 'LONG' ? 'text-green-600' : 'text-red-600'}>
                    {trade.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.entryPrice.toFixed(5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.exitPrice?.toFixed(5) || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={trade.pnl && trade.pnl > 0 ? 'text-green-600' : 'text-red-600'}>
                    ${trade.pnl?.toFixed(2) || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={trade.pips && trade.pips > 0 ? 'text-green-600' : 'text-red-600'}>
                    {trade.pips?.toFixed(1) || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${getOutcomeColor(trade.outcome)}`}>
                    {trade.outcome}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit?.(trade)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(trade.id)}
                      className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sortedTrades.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                  No trades found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TradeTable; 