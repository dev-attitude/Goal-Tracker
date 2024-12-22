import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TradeFilter as FilterType, Strategy, TradeOutcome, TradeStatus } from '@/lib/types/trade';

interface TradeFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const CURRENCY_PAIRS = [
  'EURUSD',
  'GBPUSD',
  'USDJPY',
  'USDCHF',
  'AUDUSD',
  'NZDUSD',
  'USDCAD',
];

const STRATEGIES: Strategy[] = [
  'TREND_FOLLOWING',
  'BREAKOUT',
  'REVERSAL',
  'SCALPING',
  'SWING',
  'OTHER',
];

const OUTCOMES: TradeOutcome[] = ['WIN', 'LOSS', 'BREAKEVEN', 'PENDING'];
const STATUSES: TradeStatus[] = ['OPEN', 'CLOSED', 'CANCELLED'];

const TradeFilter: FC<TradeFilterProps> = ({ filter, onFilterChange }) => {
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filter,
      dateRange: {
        ...filter.dateRange,
        [field]: value ? new Date(value) : undefined,
      },
    });
  };

  const handleArrayFilter = (field: keyof FilterType, value: string) => {
    const currentArray = filter[field] as string[] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    onFilterChange({
      ...filter,
      [field]: newArray,
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={filter.dateRange?.start?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="date"
                value={filter.dateRange?.end?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Currency Pairs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Pairs
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {CURRENCY_PAIRS.map((pair) => (
                <label key={pair} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filter.pairs?.includes(pair) || false}
                    onChange={() => handleArrayFilter('pairs', pair)}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">{pair}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Strategies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strategies
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {STRATEGIES.map((strategy) => (
                <label key={strategy} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filter.strategies?.includes(strategy) || false}
                    onChange={() => handleArrayFilter('strategies', strategy)}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">{strategy.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Outcomes and Status */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outcomes
              </label>
              <div className="space-y-2">
                {OUTCOMES.map((outcome) => (
                  <label key={outcome} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filter.outcomes?.includes(outcome) || false}
                      onChange={() => handleArrayFilter('outcomes', outcome)}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">{outcome}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="space-y-2">
                {STATUSES.map((status) => (
                  <label key={status} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filter.status?.includes(status) || false}
                      onChange={() => handleArrayFilter('status', status)}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeFilter; 