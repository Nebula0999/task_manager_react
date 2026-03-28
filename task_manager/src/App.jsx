import { useState } from 'react'
import './index.css'
import RenderTask from './components/RenderTask';
import Profile from './components/profile';
import { Navigate, useNavigate } from 'react-router';
import AddTask from './components/AddTask';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/tasks/new');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[radial-gradient(circle_at_20%_15%,#fef3c7_0%,transparent_35%),radial-gradient(circle_at_80%_85%,#bfdbfe_0%,transparent_32%),#f8fafc]">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
       <div className='place-items-center text-center items-center'>
        <button onClick={handleNavigation} className='bg-green-500 rounded p-4 m-2 text-white'>Add Task</button>
       </div>
      < RenderTask />
      <Profile />
    </div>

  );
}

export default App;