import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp, Activity } from 'lucide-react';
import { mockWeeklyActivity, mockMonthlyActivity } from '../data/mockData';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  
  const activityData = timeRange === 'weekly' ? mockWeeklyActivity : mockMonthlyActivity;
  
  const totalTasks = activityData.reduce((sum, day) => sum + day.tasks, 0);
  const avgProductivity = Math.round(activityData.reduce((sum, day) => sum + day.productivity, 0) / activityData.length);
  const peakDay = activityData.reduce((max, day) => day.tasks > max.tasks ? day : max, activityData[0]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Analytics</h1>
            <p className="text-gray-600 mt-1">
              Track your productivity trends and insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'weekly' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('weekly')}
            >
              Weekly
            </Button>
            <Button
              variant={timeRange === 'monthly' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('monthly')}
            >
              Monthly
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Total Tasks
                </p>
                <p className="text-3xl font-semibold mt-1">{totalTasks}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {timeRange === 'weekly' ? 'This week' : 'This month'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Avg Productivity
                </p>
                <p className="text-3xl font-semibold mt-1">{avgProductivity}%</p>
                <p className="text-sm text-green-600 mt-1">
                  ↑ 5% from last period
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Most Productive
                </p>
                <p className="text-3xl font-semibold mt-1">{peakDay.date}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {peakDay.tasks} tasks completed
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* Task Completion Trend */}
        <Card>
          <h3 className="mb-4">Task Completion Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis 
                dataKey="date" 
                className="text-sm"
                stroke="#9ca3af"
              />
              <YAxis 
                className="text-sm"
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#374151'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="tasks" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTasks)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Productivity Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="mb-4">Productivity Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis 
                  dataKey="date" 
                  className="text-sm"
                  stroke="#9ca3af"
                />
                <YAxis 
                  className="text-sm"
                  stroke="#9ca3af"
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: '#374151'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productivity" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="mb-4">Task Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis 
                  dataKey="date" 
                  className="text-sm"
                  stroke="#9ca3af"
                />
                <YAxis 
                  className="text-sm"
                  stroke="#9ca3af"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: '#374151'
                  }}
                />
                <Bar 
                  dataKey="tasks" 
                  fill="#8b5cf6" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <h3 className="mb-4">Insights & Recommendations</h3>
          <div className="space-y-4">
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">
                  Great progress this {timeRange === 'weekly' ? 'week' : 'month'}!
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Your productivity score has increased by 5% compared to the last period. Keep up the good work!
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-900">
                  Consider task prioritization
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  You have 5 high-priority tasks pending. Focus on completing these first to improve your efficiency.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">
                  Peak performance on {peakDay.date}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  You completed {peakDay.tasks} tasks on {peakDay.date}. Try to replicate this pattern for better results.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}