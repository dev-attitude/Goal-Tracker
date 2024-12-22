import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const calculatorSchema = z.object({
  accountSize: z.number().positive('Account size must be positive'),
  riskPercentage: z.number().min(0.1, 'Risk must be at least 0.1%').max(10, 'Risk cannot exceed 10%'),
  entryPrice: z.number().positive('Entry price must be positive'),
  stopLoss: z.number().positive('Stop loss must be positive'),
  pair: z.string().min(1, 'Currency pair is required'),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

const CURRENCY_PAIRS = [
  'EURUSD',
  'GBPUSD',
  'USDJPY',
  'USDCHF',
  'AUDUSD',
  'NZDUSD',
  'USDCAD',
];

const RiskCalculator: FC = () => {
  const [positionSize, setPositionSize] = useState<number | null>(null);
  const [riskAmount, setRiskAmount] = useState<number | null>(null);
  const [pipValue, setPipValue] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      accountSize: 10000,
      riskPercentage: 1,
      entryPrice: 0,
      stopLoss: 0,
      pair: 'EURUSD',
    },
  });

  const values = watch();

  useEffect(() => {
    if (values.accountSize && values.riskPercentage && values.entryPrice && values.stopLoss) {
      // Calculate risk amount
      const risk = (values.accountSize * values.riskPercentage) / 100;
      setRiskAmount(risk);

      // Calculate pip value and position size
      const pips = Math.abs(values.entryPrice - values.stopLoss) * 10000; // Convert to pips
      if (pips > 0) {
        // Calculate pip value based on the currency pair
        let pipValueCalculation = 0;
        if (values.pair.endsWith('JPY')) {
          pipValueCalculation = 0.01 * 100000; // JPY pairs have different pip values
        } else {
          pipValueCalculation = 0.0001 * 100000; // Standard pip value for most pairs
        }
        setPipValue(pipValueCalculation);

        // Calculate position size
        const positionSizeCalculation = risk / (pips * pipValueCalculation);
        setPositionSize(positionSizeCalculation);
      }
    }
  }, [values]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Size
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              {...register('accountSize', { valueAsNumber: true })}
              className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.accountSize && (
            <p className="mt-1 text-xs text-red-500">{errors.accountSize.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Percentage
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              {...register('riskPercentage', { valueAsNumber: true })}
              className="w-full pr-8 pl-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
          {errors.riskPercentage && (
            <p className="mt-1 text-xs text-red-500">{errors.riskPercentage.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Currency Pair
        </label>
        <select
          {...register('pair')}
          className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {CURRENCY_PAIRS.map((pair) => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </select>
        {errors.pair && (
          <p className="mt-1 text-xs text-red-500">{errors.pair.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entry Price
          </label>
          <input
            type="number"
            step="0.00001"
            {...register('entryPrice', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.entryPrice && (
            <p className="mt-1 text-xs text-red-500">{errors.entryPrice.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stop Loss
          </label>
          <input
            type="number"
            step="0.00001"
            {...register('stopLoss', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.stopLoss && (
            <p className="mt-1 text-xs text-red-500">{errors.stopLoss.message}</p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Risk Amount:</span>
          <span className="text-sm font-semibold text-gray-900">
            ${riskAmount?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Pip Value:</span>
          <span className="text-sm font-semibold text-gray-900">
            ${pipValue?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Position Size (Lots):</span>
          <span className="text-sm font-semibold text-gray-900">
            {positionSize?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator; 