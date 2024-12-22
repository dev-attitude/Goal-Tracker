'use client';

import { FC, useState } from 'react';
import { Goal, GoalStatus } from '@/lib/types/goal';
import GoalCard from '@/components/goals/GoalCard';
import GoalForm from '@/components/goals/GoalForm';
import { PlusIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Sample data - replace with real data later
const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Monthly Profit Target',
    type: 'PROFIT',
    timeframe: 'MONTHLY',
    target: 5000,
    current: 3250,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    status: 'ACTIVE',
    description: 'Achieve $5,000 in trading profits this month',
    metrics: {
      progress: 65,
      trend: 'up',
      daysRemaining: 15,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Win Rate Goal',
    type: 'WIN_RATE',
    timeframe: 'WEEKLY',
    target: 65,
    current: 58,
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-14'),
    status: 'ACTIVE',
    description: 'Maintain a 65% win rate on all trades',
    metrics: {
      progress: 89,
      trend: 'up',
      daysRemaining: 5,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const GoalsPage: FC = () => {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<GoalStatus | 'ALL'>('ALL');

  const handleCreateGoal = (data: Omit<Goal, 'id' | 'current' | 'status' | 'metrics' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      current: 0,
      status: 'ACTIVE',
      metrics: {
        progress: 0,
        trend: 'neutral',
        daysRemaining: Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGoals([newGoal, ...goals]);
    setIsFormOpen(false);
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsFormOpen(true);
  };

  const handleArchiveGoal = (goalId: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, status: 'ARCHIVED' as GoalStatus, updatedAt: new Date() }
          : goal
      )
    );
  };

  const filteredGoals = goals.filter(
    (goal) => selectedStatus === 'ALL' || goal.status === selectedStatus
  );

  const getStatusColor = (status: GoalStatus | 'ALL') => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 hover:bg-blue-100';
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20 hover:bg-green-100';
      case 'FAILED':
        return 'bg-red-50 text-red-700 ring-1 ring-red-600/20 hover:bg-red-100';
      case 'ARCHIVED':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100';
      default:
        return 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Goals
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Track and manage your trading goals</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedGoal(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md group w-full sm:w-auto justify-center sm:justify-start"
          >
            <PlusIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
            New Goal
          </motion.button>
        </div>

        {/* Filters */}
        <motion.div {...fadeIn} className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {(['ALL', 'ACTIVE', 'COMPLETED', 'FAILED', 'ARCHIVED'] as const).map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedStatus === status
                  ? getStatusColor(status)
                  : 'bg-white text-gray-600 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              {status === 'ALL' ? 'All Goals' : status.charAt(0) + status.slice(1).toLowerCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              {...fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <GoalCard
                goal={goal}
                onEdit={handleEditGoal}
                onArchive={handleArchiveGoal}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGoals.length === 0 && (
          <motion.div
            {...fadeIn}
            className="text-center py-8 sm:py-12"
          >
            <div className="mx-auto w-16 sm:w-24 h-16 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <AdjustmentsHorizontalIcon className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">No goals found</h3>
            <p className="text-sm sm:text-base text-gray-500">
              {selectedStatus === 'ALL'
                ? "You haven't created any goals yet. Click 'New Goal' to get started!"
                : `No ${selectedStatus.toLowerCase()} goals found. Try selecting a different filter.`}
            </p>
          </motion.div>
        )}

        {/* Goal Form Modal */}
        <GoalForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedGoal(undefined);
          }}
          onSubmit={handleCreateGoal}
          initialData={selectedGoal}
        />
      </div>
    </div>
  );
};

export default GoalsPage; 