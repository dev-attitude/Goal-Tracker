'use client';

import { Card } from "@/components/ui/card";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ClockIcon,
  BanknotesIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import TradeDistributionChart from "@/components/analysis/TradeDistributionChart";
import WinLossChart from "@/components/analysis/WinLossChart";
import ProfitFactorChart from "@/components/analysis/ProfitFactorChart";
import RiskAnalysisChart from "@/components/analysis/RiskAnalysisChart";
import EquityCurveChart from "@/components/analysis/EquityCurveChart";
import TradeDurationChart from "@/components/analysis/TradeDurationChart";
import PairPerformanceChart from "@/components/analysis/PairPerformanceChart";

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed analysis of your trading performance and patterns
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Profit/Loss</p>
              <h3 className="text-xl font-semibold text-gray-900">$2,345.00</h3>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                +12.5% from last period
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ScaleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Win Rate</p>
              <h3 className="text-xl font-semibold text-gray-900">65%</h3>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                -2.3% from last period
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Hold Time</p>
              <h3 className="text-xl font-semibold text-gray-900">2h 15m</h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                No significant change
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Trading Pair Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Pair Performance</h3>
        <PairPerformanceChart />
      </Card>

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Distribution</h3>
          <TradeDistributionChart />
        </Card>

        {/* Win/Loss Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Analysis</h3>
          <WinLossChart />
        </Card>

        {/* Trade Duration Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Duration vs Outcome</h3>
          <TradeDurationChart />
        </Card>

        {/* Risk Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk/Reward Analysis</h3>
          <RiskAnalysisChart />
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Trades</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">156</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Trade</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">$15.03</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Largest Win</p>
            <p className="mt-1 text-xl font-semibold text-green-600">$450.00</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Largest Loss</p>
            <p className="mt-1 text-xl font-semibold text-red-600">-$125.00</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Win Streak</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">8 trades</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Loss Streak</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">3 trades</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Win</p>
            <p className="mt-1 text-xl font-semibold text-green-600">$35.50</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Loss</p>
            <p className="mt-1 text-xl font-semibold text-red-600">-$22.30</p>
          </div>
        </div>
      </Card>

      {/* Equity Curve */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h3>
        <EquityCurveChart />
      </Card>
    </div>
  );
} 