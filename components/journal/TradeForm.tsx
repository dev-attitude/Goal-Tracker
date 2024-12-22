import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from '@/components/ui/modal';
import { Trade, TradeType, Strategy, TradeStatus, TradeOutcome } from '@/lib/types/trade';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TradeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Trade, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Trade;
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

const tradeSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  pair: z.string().min(1, 'Currency pair is required'),
  type: z.enum(['LONG', 'SHORT']),
  strategy: z.enum(['TREND_FOLLOWING', 'BREAKOUT', 'REVERSAL', 'SCALPING', 'SWING', 'OTHER']),
  entryPrice: z.number().positive('Entry price must be positive'),
  exitPrice: z.number().positive('Exit price must be positive').optional(),
  stopLoss: z.number().positive('Stop loss must be positive'),
  takeProfit: z.number().positive('Take profit must be positive'),
  lotSize: z.number().positive('Lot size must be positive'),
  status: z.enum(['OPEN', 'CLOSED', 'CANCELLED']),
  outcome: z.enum(['WIN', 'LOSS', 'BREAKEVEN', 'PENDING']),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  linkedGoals: z.array(z.string()).optional(),
  pnl: z.number().optional(),
  pips: z.number().optional(),
});

type TradeFormData = z.input<typeof tradeSchema>;
type TradeFormDataProcessed = Omit<Trade, 'id' | 'createdAt' | 'updatedAt'>;

const TradeForm: FC<TradeFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      status: 'OPEN',
      outcome: 'PENDING',
      tags: [],
      linkedGoals: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      const formData: TradeFormData = {
        ...initialData,
        date: initialData.date.toISOString().split('T')[0],
      };
      reset(formData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: TradeFormData) => {
    const processedData: TradeFormDataProcessed = {
      ...data,
      date: new Date(data.date),
      pnl: data.pnl || 0,
      pips: data.pips || 0,
    };
    onSubmit(processedData);
    reset();
    onClose();
  };

  const watchType = watch('type');
  const watchStatus = watch('status');

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-xl bg-white rounded-xl shadow-xl">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {initialData ? 'Edit Trade' : 'New Trade Entry'}
            </h2>

            <div className="space-y-6">
              {/* Row 1: Date and Pair */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency Pair
                  </label>
                  <select
                    {...register('pair')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Pair</option>
                    {CURRENCY_PAIRS.map((pair) => (
                      <option key={pair} value={pair}>{pair}</option>
                    ))}
                  </select>
                  {errors.pair && (
                    <p className="mt-1 text-xs text-red-500">{errors.pair.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Type and Strategy */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('type')}
                        value="LONG"
                        className="form-radio text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Long</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register('type')}
                        value="SHORT"
                        className="form-radio text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Short</span>
                    </label>
                  </div>
                  {errors.type && (
                    <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strategy
                  </label>
                  <select
                    {...register('strategy')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Strategy</option>
                    {STRATEGIES.map((strategy) => (
                      <option key={strategy} value={strategy}>
                        {strategy.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  {errors.strategy && (
                    <p className="mt-1 text-xs text-red-500">{errors.strategy.message}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Entry and Exit Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    {...register('entryPrice', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.entryPrice && (
                    <p className="mt-1 text-xs text-red-500">{errors.entryPrice.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exit Price
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    {...register('exitPrice', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    disabled={watchStatus === 'OPEN'}
                  />
                  {errors.exitPrice && (
                    <p className="mt-1 text-xs text-red-500">{errors.exitPrice.message}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Stop Loss and Take Profit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stop Loss
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    {...register('stopLoss', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.stopLoss && (
                    <p className="mt-1 text-xs text-red-500">{errors.stopLoss.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Take Profit
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    {...register('takeProfit', { valueAsNumber: true })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.takeProfit && (
                    <p className="mt-1 text-xs text-red-500">{errors.takeProfit.message}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Lot Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Size (Lots)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('lotSize', { valueAsNumber: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.lotSize && (
                  <p className="mt-1 text-xs text-red-500">{errors.lotSize.message}</p>
                )}
              </div>

              {/* Row 6: Status and Outcome */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outcome
                  </label>
                  <select
                    {...register('outcome')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    disabled={watchStatus === 'OPEN'}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="WIN">Win</option>
                    <option value="LOSS">Loss</option>
                    <option value="BREAKEVEN">Breakeven</option>
                  </select>
                  {errors.outcome && (
                    <p className="mt-1 text-xs text-red-500">{errors.outcome.message}</p>
                  )}
                </div>
              </div>

              {/* Row 7: Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Add any trade notes, observations, or lessons learned..."
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {initialData ? 'Update Trade' : 'Add Trade'}
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TradeForm; 