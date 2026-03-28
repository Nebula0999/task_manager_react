import './index.css'
import RenderTask from './components/RenderTask';
import Profile from './components/profile';
import { useNavigate } from 'react-router';
import AddTask from './components/AddTask';


function App() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/tasks/new');
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
       <div className='place-items-center text-center items-center'>
        <button onClick={handleNavigation} className='bg-green-500 rounded p-2 m-0.5 text-white'>Add Task</button>
       </div>
      < RenderTask />
      <Profile />
    </div>

  );
}

export default App;