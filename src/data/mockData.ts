export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
}

export interface ActivityData {
  date: string;
  tasks: number;
  productivity: number;
}

export interface Stats {
  tasksCompleted: number;
  pendingTasks: number;
  productivityScore: number;
  weeklyChange: number;
}

// Mock data
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-02-15',
    createdAt: '2026-02-10',
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests from team members',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-02-14',
    createdAt: '2026-02-12',
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Update npm packages to latest stable versions',
    status: 'done',
    priority: 'low',
    dueDate: '2026-02-13',
    createdAt: '2026-02-11',
  },
  {
    id: '4',
    title: 'Fix bug in authentication flow',
    description: 'Resolve the issue with OAuth redirect',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-02-14',
    createdAt: '2026-02-13',
  },
  {
    id: '5',
    title: 'Implement dark mode',
    description: 'Add dark mode support across the application',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-02-12',
    createdAt: '2026-02-09',
  },
  {
    id: '6',
    title: 'Optimize database queries',
    description: 'Improve performance of slow running queries',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-02-16',
    createdAt: '2026-02-11',
  },
  {
    id: '7',
    title: 'Write unit tests',
    description: 'Add test coverage for new components',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-02-17',
    createdAt: '2026-02-13',
  },
  {
    id: '8',
    title: 'Design new landing page',
    description: 'Create mockups for the updated landing page',
    status: 'done',
    priority: 'low',
    dueDate: '2026-02-11',
    createdAt: '2026-02-08',
  },
];

export const mockWeeklyActivity: ActivityData[] = [
  { date: 'Mon', tasks: 5, productivity: 75 },
  { date: 'Tue', tasks: 8, productivity: 85 },
  { date: 'Wed', tasks: 6, productivity: 70 },
  { date: 'Thu', tasks: 9, productivity: 90 },
  { date: 'Fri', tasks: 7, productivity: 80 },
  { date: 'Sat', tasks: 3, productivity: 60 },
  { date: 'Sun', tasks: 2, productivity: 50 },
];

export const mockMonthlyActivity: ActivityData[] = [
  { date: 'Week 1', tasks: 28, productivity: 75 },
  { date: 'Week 2', tasks: 35, productivity: 82 },
  { date: 'Week 3', tasks: 32, productivity: 78 },
  { date: 'Week 4', tasks: 38, productivity: 85 },
];

export const mockStats: Stats = {
  tasksCompleted: 3,
  pendingTasks: 5,
  productivityScore: 78,
  weeklyChange: 12,
};
