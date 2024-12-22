import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type GoalTimeframe = "daily" | "weekly" | "monthly" | "custom";

export type GoalCategory = "technical" | "financial" | "psychological";

export type GoalType = "profit" | "winRate" | "riskManagement" | "behavioral";

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  category: GoalCategory;
  timeframe: GoalTimeframe;
  target: number;
  currentValue: number;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
} 