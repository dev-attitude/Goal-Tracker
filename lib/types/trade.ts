export type TradeType = 'LONG' | 'SHORT';
export type TradeStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';
export type TradeOutcome = 'WIN' | 'LOSS' | 'BREAKEVEN' | 'PENDING';
export type Strategy = 'TREND_FOLLOWING' | 'BREAKOUT' | 'REVERSAL' | 'SCALPING' | 'SWING' | 'OTHER';

export interface Trade {
  id: string;
  date: Date;
  pair: string;
  type: TradeType;
  strategy: Strategy;
  entryPrice: number;
  exitPrice?: number;
  stopLoss: number;
  takeProfit: number;
  lotSize: number;
  status: TradeStatus;
  outcome: TradeOutcome;
  pnl?: number;
  pips?: number;
  notes?: string;
  tags?: string[];
  linkedGoals?: string[];
  screenshots?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TradeFilter {
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  pairs?: string[];
  strategies?: Strategy[];
  outcomes?: TradeOutcome[];
  status?: TradeStatus[];
} 