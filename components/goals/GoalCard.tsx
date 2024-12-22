import { FC } from 'react';
import { Goal } from '@/lib/types/goal';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArchiveBoxIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onArchive: (goalId: string) => void;
}

const GoalCard: FC<GoalCardProps> = ({ goal, onEdit, onArchive }) => {
  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <ClockIcon className="w-4 h-4" />;
      case 'COMPLETED':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'FAILED':
        return <XCircleIcon className="w-4 h-4" />;
      case 'ARCHIVED':
        return <ArchiveBoxIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatValue = (type: Goal['type'], value: number) => {
    switch (type) {
      case 'PROFIT':
        return `$${value.toFixed(2)}`;
      case 'WIN_RATE':
        return `${value}%`;
      case 'RISK_REWARD':
        return value.toFixed(2);
      case 'TRADE_FREQUENCY':
        return Math.round(value);
      case 'MAX_DRAWDOWN':
        return `${value}%`;
      default:
        return value;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {goal.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              {goal.timeframe.charAt(0) + goal.timeframe.slice(1).toLowerCase()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                goal.status
              )}`}
            >
              <span className="mr-1">{getStatusIcon(goal.status)}</span>
              {goal.status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Progress</span>
              <span className="text-sm font-medium text-gray-900">
                {formatValue(goal.type, goal.current)} / {formatValue(goal.type, goal.target)}
              </span>
            </div>
            <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <Progress
                value={goal.metrics.progress}
                className={`h-full transition-all duration-500 ${getProgressColor(goal.metrics.progress)}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Trend</p>
              <div className="flex items-center mt-1">
                {goal.metrics.trend === 'up' ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1 animate-bounce" />
                ) : goal.metrics.trend === 'down' ? (
                  <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1 animate-bounce" />
                ) : null}
                <span className="text-sm font-medium text-gray-900">
                  {goal.metrics.trend === 'neutral'
                    ? 'No change'
                    : `${goal.metrics.trend === 'up' ? 'Improving' : 'Declining'}`}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Remaining</p>
              <p className={`text-sm font-medium mt-1 ${
                goal.metrics.daysRemaining <= 7 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {goal.metrics.daysRemaining} days
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onArchive(goal.id)}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArchiveBoxIcon className="w-4 h-4 mr-1" />
            Archive
          </button>
          <button
            onClick={() => onEdit(goal)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
      </div>
    </Card>
  );
};

export default GoalCard; 