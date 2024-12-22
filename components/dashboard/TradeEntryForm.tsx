import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from '@/components/ui/modal';

const tradeSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  type: z.enum(['LONG', 'SHORT']),
  entryPrice: z.number().positive('Entry price must be positive'),
  stopLoss: z.number().positive('Stop loss must be positive'),
  takeProfit: z.number().positive('Take profit must be positive'),
  size: z.number().positive('Position size must be positive'),
  notes: z.string().optional(),
});

type TradeFormData = z.infer<typeof tradeSchema>;

interface TradeEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TradeFormData) => void;
}

const TradeEntryForm: FC<TradeEntryFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
  });

  const handleFormSubmit = (data: TradeFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader>
            <ModalTitle>New Trade Entry</ModalTitle>
          </ModalHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="symbol" className="text-right">
                Symbol
              </label>
              <input
                {...register('symbol')}
                id="symbol"
                className="col-span-3 px-3 py-2 border rounded-md"
                placeholder="EURUSD"
              />
              {errors.symbol && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.symbol.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                Type
              </label>
              <select
                {...register('type')}
                id="type"
                className="col-span-3 px-3 py-2 border rounded-md"
              >
                <option value="LONG">Long</option>
                <option value="SHORT">Short</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="entryPrice" className="text-right">
                Entry Price
              </label>
              <input
                {...register('entryPrice', { valueAsNumber: true })}
                id="entryPrice"
                type="number"
                step="0.00001"
                className="col-span-3 px-3 py-2 border rounded-md"
              />
              {errors.entryPrice && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.entryPrice.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="stopLoss" className="text-right">
                Stop Loss
              </label>
              <input
                {...register('stopLoss', { valueAsNumber: true })}
                id="stopLoss"
                type="number"
                step="0.00001"
                className="col-span-3 px-3 py-2 border rounded-md"
              />
              {errors.stopLoss && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.stopLoss.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="takeProfit" className="text-right">
                Take Profit
              </label>
              <input
                {...register('takeProfit', { valueAsNumber: true })}
                id="takeProfit"
                type="number"
                step="0.00001"
                className="col-span-3 px-3 py-2 border rounded-md"
              />
              {errors.takeProfit && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.takeProfit.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="size" className="text-right">
                Position Size
              </label>
              <input
                {...register('size', { valueAsNumber: true })}
                id="size"
                type="number"
                step="0.01"
                className="col-span-3 px-3 py-2 border rounded-md"
              />
              {errors.size && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.size.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                Notes
              </label>
              <textarea
                {...register('notes')}
                id="notes"
                className="col-span-3 px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Add any trade notes or observations..."
              />
            </div>
          </div>

          <ModalFooter>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
            >
              Submit
            </button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TradeEntryForm; 