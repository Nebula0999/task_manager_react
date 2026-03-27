import { useState } from 'react'
import './index.css'
import RenderTask from './components/RenderTask';
import Profile from './components/profile';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[radial-gradient(circle_at_20%_15%,#fef3c7_0%,transparent_35%),radial-gradient(circle_at_80%_85%,#bfdbfe_0%,transparent_32%),#f8fafc]">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      < RenderTask />
      <Profile />
    </div>

  );
}

export default App;