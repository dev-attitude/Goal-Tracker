import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from '@/components/ui/modal';
import { Trade, TradeType, Strategy, TradeStatus, TradeOutcome } from '@/lib/types/trade';
import { 
  XMarkIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <Modal open={isOpen} onOpenChange={onClose}>
          <ModalContent className="w-full max-w-xl mx-auto h-[calc(100vh-2rem)] sm:h-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden h-full sm:h-auto flex flex-col"
            >
              <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col h-full">
                {/* Header - Sticky */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      {initialData ? 'Edit Trade' : 'New Trade Entry'}
                    </h2>
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Row 1: Date and Pair */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          Date
                        </label>
                        <input
                          type="date"
                          {...register('date')}
                          className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        />
                        {errors.date && (
                          <p className="text-xs text-red-500">{errors.date.message}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                          Currency Pair
                        </label>
                        <select
                          {...register('pair')}
                          className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        >
                          <option value="">Select Pair</option>
                          {CURRENCY_PAIRS.map((pair) => (
                            <option key={pair} value={pair}>{pair}</option>
                          ))}
                        </select>
                        {errors.pair && (
                          <p className="text-xs text-red-500">{errors.pair.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Type and Strategy */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <div className="flex gap-2 sm:gap-4">
                          <label className="flex-1 relative flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              {...register('type')}
                              value="LONG"
                              className="peer sr-only"
                            />
                            <div className="h-10 w-full px-3 sm:px-4 flex items-center justify-center gap-2 rounded-xl border border-gray-200 text-gray-500 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-600 transition-colors">
                              <ArrowTrendingUpIcon className="w-4 h-4" />
                              <span className="text-sm font-medium">Long</span>
                            </div>
                          </label>
                          <label className="flex-1 relative flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              {...register('type')}
                              value="SHORT"
                              className="peer sr-only"
                            />
                            <div className="h-10 w-full px-3 sm:px-4 flex items-center justify-center gap-2 rounded-xl border border-gray-200 text-gray-500 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-600 transition-colors">
                              <ArrowTrendingDownIcon className="w-4 h-4" />
                              <span className="text-sm font-medium">Short</span>
                            </div>
                          </label>
                        </div>
                        {errors.type && (
                          <p className="text-xs text-red-500">{errors.type.message}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <TagIcon className="w-4 h-4 text-gray-400" />
                          Strategy
                        </label>
                        <select
                          {...register('strategy')}
                          className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        >
                          <option value="">Select Strategy</option>
                          {STRATEGIES.map((strategy) => (
                            <option key={strategy} value={strategy}>
                              {strategy.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                        {errors.strategy && (
                          <p className="text-xs text-red-500">{errors.strategy.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3-7: Existing price inputs, status, outcome, and notes with mobile-friendly grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Entry Price */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Entry Price</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.00001"
                            {...register('entryPrice', { valueAsNumber: true })}
                            className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm pl-8 transition-colors"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        </div>
                        {errors.entryPrice && (
                          <p className="text-xs text-red-500">{errors.entryPrice.message}</p>
                        )}
                      </div>

                      {/* Exit Price */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Exit Price</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.00001"
                            {...register('exitPrice', { valueAsNumber: true })}
                            className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm pl-8 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                            disabled={watchStatus === 'OPEN'}
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        </div>
                        {errors.exitPrice && (
                          <p className="text-xs text-red-500">{errors.exitPrice.message}</p>
                        )}
                      </div>

                      {/* Stop Loss */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Stop Loss</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.00001"
                            {...register('stopLoss', { valueAsNumber: true })}
                            className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm pl-8 transition-colors"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        </div>
                        {errors.stopLoss && (
                          <p className="text-xs text-red-500">{errors.stopLoss.message}</p>
                        )}
                      </div>

                      {/* Take Profit */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Take Profit</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.00001"
                            {...register('takeProfit', { valueAsNumber: true })}
                            className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm pl-8 transition-colors"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        </div>
                        {errors.takeProfit && (
                          <p className="text-xs text-red-500">{errors.takeProfit.message}</p>
                        )}
                      </div>

                      {/* Lot Size */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Lot Size</label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('lotSize', { valueAsNumber: true })}
                          className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        />
                        {errors.lotSize && (
                          <p className="text-xs text-red-500">{errors.lotSize.message}</p>
                        )}
                      </div>

                      {/* Status */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          {...register('status')}
                          className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        >
                          <option value="OPEN">Open</option>
                          <option value="CLOSED">Closed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                        {errors.status && (
                          <p className="text-xs text-red-500">{errors.status.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Outcome (only if status is CLOSED) */}
                    {watchStatus === 'CLOSED' && (
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Outcome</label>
                        <select
                          {...register('outcome')}
                          className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        >
                          <option value="WIN">Win</option>
                          <option value="LOSS">Loss</option>
                          <option value="BREAKEVEN">Break Even</option>
                        </select>
                        {errors.outcome && (
                          <p className="text-xs text-red-500">{errors.outcome.message}</p>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                        Notes
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                        placeholder="Add any additional notes about this trade..."
                      />
                      {errors.notes && (
                        <p className="text-xs text-red-500">{errors.notes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer - Sticky */}
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md"
                    >
                      {initialData ? 'Update Trade' : 'Create Trade'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TradeForm; 