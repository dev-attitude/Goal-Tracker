'use client';

import { Card } from "@/components/ui/card";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ClockIcon,
  BanknotesIcon,
  ScaleIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import TradeDistributionChart from "@/components/analysis/TradeDistributionChart";
import WinLossChart from "@/components/analysis/WinLossChart";
import ProfitFactorChart from "@/components/analysis/ProfitFactorChart";
import RiskAnalysisChart from "@/components/analysis/RiskAnalysisChart";
import EquityCurveChart from "@/components/analysis/EquityCurveChart";
import TradeDurationChart from "@/components/analysis/TradeDurationChart";
import PairPerformanceChart from "@/components/analysis/PairPerformanceChart";
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Trading Analysis
            </h1>
            <p className="text-gray-600">
              Detailed analysis of your trading performance and patterns
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-white rounded-xl shadow-sm p-1.5">
            <select className="px-4 py-2 text-sm text-gray-700 bg-transparent focus:outline-none focus:ring-0 cursor-pointer">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <BanknotesIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Profit/Loss</p>
                  <h3 className="text-2xl font-bold text-gray-900">$2,345.00</h3>
                  <p className="text-sm text-green-600 flex items-center mt-1 font-medium">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    +12.5% from last period
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <ScaleIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Win Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900">65%</h3>
                  <p className="text-sm text-red-600 flex items-center mt-1 font-medium">
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                    -2.3% from last period
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Average Hold Time</p>
                  <h3 className="text-2xl font-bold text-gray-900">2h 15m</h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1 font-medium">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    No significant change
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Trading Pair Performance */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">Trading Pair Performance</h3>
                  <p className="text-sm text-gray-500">Performance analysis by currency pair</p>
                </div>
                <ChartBarIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <PairPerformanceChart />
            </div>
          </Card>
        </motion.div>

        {/* Analysis Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">Trade Distribution</h3>
                    <p className="text-sm text-gray-500">Distribution of trades by outcome</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TradeDistributionChart />
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">Win/Loss Analysis</h3>
                    <p className="text-sm text-gray-500">Breakdown of winning and losing trades</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <WinLossChart />
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.7 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">Trade Duration vs Outcome</h3>
                    <p className="text-sm text-gray-500">Analysis of trade duration impact</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TradeDurationChart />
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.8 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">Risk/Reward Analysis</h3>
                    <p className="text-sm text-gray-500">Analysis of risk-reward ratios</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <RiskAnalysisChart />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Statistics */}
        <motion.div {...fadeIn} transition={{ delay: 0.9 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">Detailed Statistics</h3>
                  <p className="text-sm text-gray-500">Comprehensive trading metrics</p>
                </div>
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Total Trades</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Average Trade</p>
                  <p className="text-2xl font-bold text-gray-900">$15.03</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Largest Win</p>
                  <p className="text-2xl font-bold text-green-600">$450.00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Largest Loss</p>
                  <p className="text-2xl font-bold text-red-600">-$125.00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Win Streak</p>
                  <p className="text-2xl font-bold text-gray-900">8 trades</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Loss Streak</p>
                  <p className="text-2xl font-bold text-gray-900">3 trades</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Average Win</p>
                  <p className="text-2xl font-bold text-green-600">$35.50</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Average Loss</p>
                  <p className="text-2xl font-bold text-red-600">-$22.30</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Equity Curve */}
        <motion.div {...fadeIn} transition={{ delay: 1.0 }}>
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">Equity Curve</h3>
                  <p className="text-sm text-gray-500">Account balance progression over time</p>
                </div>
                <ChartBarIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <EquityCurveChart />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 