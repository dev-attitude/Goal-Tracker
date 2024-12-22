'use client';

import { FC, useState } from 'react';
import { Goal, GoalStatus } from '@/lib/types/goal';
import GoalCard from '@/components/goals/GoalCard';
import GoalForm from '@/components/goals/GoalForm';
import { PlusIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Goals</h1>
            <p className="mt-2 text-gray-600">Track and manage your trading goals</p>
          </div>
          <button
            onClick={() => {
              setSelectedGoal(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Goal
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['ALL', 'ACTIVE', 'COMPLETED', 'FAILED', 'ARCHIVED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedStatus === status
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'ALL' ? 'All Goals' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEditGoal}
              onArchive={handleArchiveGoal}
            />
          ))}
        </div>

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