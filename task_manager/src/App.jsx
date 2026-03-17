import { useState } from 'react'
import './index.css'
import AddTaskForm from './components/AddTaskForm'


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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="border p-2 mr-2 w-full md:w-auto"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2">
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{task}</span>
            <button onClick={() => deleteTask(index)} className="bg-red-500 text-white px-2 py-1">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <AddTaskForm />
    </div>

  );
}

export default App;