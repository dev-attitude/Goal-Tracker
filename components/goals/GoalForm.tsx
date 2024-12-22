import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '../ui/dialog';
import { Goal, GoalType, GoalTimeframe } from '@/lib/types/goal';
import { XMarkIcon } from '@heroicons/react/24/outline';

const goalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['PROFIT', 'WIN_RATE', 'RISK_REWARD', 'TRADE_FREQUENCY', 'MAX_DRAWDOWN']),
  timeframe: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']),
  target: z.number().positive('Target must be positive'),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  description: z.string().optional(),
});

type GoalFormData = z.input<typeof goalSchema>;

interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Goal, 'id' | 'current' | 'status' | 'metrics' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Goal;
}

const GOAL_TYPES: { value: GoalType; label: string }[] = [
  { value: 'PROFIT', label: 'Profit Target' },
  { value: 'WIN_RATE', label: 'Win Rate' },
  { value: 'RISK_REWARD', label: 'Risk/Reward Ratio' },
  { value: 'TRADE_FREQUENCY', label: 'Trade Frequency' },
  { value: 'MAX_DRAWDOWN', label: 'Maximum Drawdown' },
];

const TIMEFRAMES: { value: GoalTimeframe; label: string }[] = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'QUARTERLY', label: 'Quarterly' },
  { value: 'YEARLY', label: 'Yearly' },
];

const GoalForm: FC<GoalFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          startDate: initialData.startDate.toISOString().split('T')[0],
          endDate: initialData.endDate.toISOString().split('T')[0],
        }
      : {
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
  });

  const handleFormSubmit = (data: GoalFormData) => {
    onSubmit({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="relative">
          <DialogHeader className="p-4 border-b border-gray-100">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {initialData ? 'Edit Goal' : 'Create New Goal'}
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="p-4 space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                placeholder="Enter goal title"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Type and Timeframe */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Type
                </label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-white"
                >
                  {GOAL_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeframe
                </label>
                <select
                  {...register('timeframe')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-white"
                >
                  {TIMEFRAMES.map((timeframe) => (
                    <option key={timeframe.value} value={timeframe.value}>
                      {timeframe.label}
                    </option>
                  ))}
                </select>
                {errors.timeframe && (
                  <p className="mt-1 text-xs text-red-500">{errors.timeframe.message}</p>
                )}
              </div>
            </div>

            {/* Target Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Value
              </label>
              <input
                type="number"
                step="0.01"
                {...register('target', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
              {errors.target && (
                <p className="mt-1 text-xs text-red-500">{errors.target.message}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
                {errors.startDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  {...register('endDate')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
                {errors.endDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                {...register('description')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                placeholder="Add any additional details or notes..."
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {initialData ? 'Update' : 'Create Goal'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalForm; 