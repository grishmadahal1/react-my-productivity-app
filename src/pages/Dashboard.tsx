import React from 'react';
import { Layout } from '../components/Layout';
import { Card, StatCard } from '../components/ui/Card';
import { CheckCircle2, Clock, TrendingUp, ListTodo } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockStats, mockWeeklyActivity, mockTasks } from '../data/mockData';

export default function Dashboard() {
  const recentTasks = mockTasks.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1>Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your productivity overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Tasks Completed"
            value={mockStats.tasksCompleted}
            change={mockStats.weeklyChange}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <StatCard
            title="Pending Tasks"
            value={mockStats.pendingTasks}
            icon={<Clock className="w-6 h-6" />}
          />
          <StatCard
            title="Productivity Score"
            value={`${mockStats.productivityScore}%`}
            change={5}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Total Tasks"
            value={mockTasks.length}
            icon={<ListTodo className="w-6 h-6" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <Card>
            <h3 className="mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockWeeklyActivity}>
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
                <Line 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Productivity Chart */}
          <Card>
            <h3 className="mb-4">Productivity Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeeklyActivity}>
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
                  dataKey="productivity" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Tasks */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3>Recent Tasks</h3>
            <a 
              href="/tasks" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </a>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`
                    w-2 h-2 rounded-full
                    ${task.status === 'done' ? 'bg-green-500' : ''}
                    ${task.status === 'in-progress' ? 'bg-blue-500' : ''}
                    ${task.status === 'todo' ? 'bg-gray-400' : ''}
                  `} />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${task.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                    ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${task.priority === 'low' ? 'bg-green-100 text-green-700' : ''}
                  `}>
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-500 min-w-[80px]">
                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}