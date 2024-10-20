'use client'

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CheckCircle, Award, Zap, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DailyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <StatCard
        title="Tasks Completed"
        value="7"
        icon={<CheckCircle className="h-8 w-8 text-green-500" />}
      />
      <StatCard
        title="Points Earned"
        value="350"
        icon={<Award className="h-8 w-8 text-yellow-500" />}
      />
      <StatCard
        title="Current Streak"
        value="5 days"
        icon={<Zap className="h-8 w-8 text-orange-500" />}
      />
      <StatCard
        title="Performance"
        value="8/10"
        icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
      />
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
export default function Dashboard() {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Task Completion',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-8 w-full">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Today's Performance (1/10)</h2>
      <DailyStats />
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Weekly Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
