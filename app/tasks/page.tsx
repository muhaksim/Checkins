'use client'

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter a new task"
          />
          <button
            onClick={addTask}
            className="bg-purple-500 text-white p-2 rounded-r-md hover:bg-purple-600 transition-colors"
          >
            <Plus />
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="p-3 bg-white rounded-md shadow hover:shadow-md transition-shadow"
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}
