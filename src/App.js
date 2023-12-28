import { useState, useEffect } from "react"
import Header from "./component/Header";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";
import Footer from "./component/Footer";
import About from "./component/About";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";


function App() {
  const [showAddTask, setshowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    // console.log(data)
    return data
  }
  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //add task
  const addTask = async (task) =>{
    const res = await fetch('http://localhost:5000/tasks', {
      method : 'POST',
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
    // console.log(task);
  }
  const deleteTaks = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id !== id))
    console.log('delete',id);
  }

  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updTask= {...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()

    setTasks(
      tasks.map((task)=>task.id === id ? {...task, reminder: data.reminder} : task)
    )
  }
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/' element={ // Sử dụng element thay vì render trong React Router v6
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks tasks={tasks} onDelete={deleteTaks} onToggle={toggleReminder} />
                ) : ('no thanks')}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>hello from a class</h1>
//   }
// }
export default App;
