export type GoalType = 'PROFIT' | 'WIN_RATE' | 'RISK_REWARD' | 'TRADE_FREQUENCY' | 'MAX_DRAWDOWN';

export type GoalTimeframe = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'ARCHIVED';

export interface Goal {
  id: string;
  type: GoalType;
  timeframe: GoalTimeframe;
  target: number;
  current: number;
  startDate: Date;
  endDate: Date;
  status: GoalStatus;
  title: string;
  description?: string;
  metrics: {
    progress: number;
    trend: 'up' | 'down' | 'neutral';
    daysRemaining: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalAlert {
  id: string;
  goalId: string;
  type: 'DEADLINE' | 'THRESHOLD' | 'ACHIEVEMENT';
  message: string;
  createdAt: Date;
  read: boolean;
}

export interface GoalHeatmapData {
  date: string;
  value: number;
  goals: string[]; // Goal IDs achieved on this date
} 