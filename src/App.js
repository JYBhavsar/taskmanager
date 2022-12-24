import './App.css'
import Header from "./components/Header";
import AddTasks from './components/AddTasks.jsx'
import EditTasks from './components/EditTasks.jsx'
import Tasks from "./components/Tasks";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let initTasks;
  if (localStorage.getItem("task") === null) {
    initTasks = [];
  }
  else {
    initTasks = JSON.parse(localStorage.getItem("task"));
  }

  const [task, setTask] = useState(initTasks); 
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task])

  const [newTask, setNewTask] = useState('');
  const [updateTask, setUpdateTask] = useState('');

  const addTask = ()=>{
      if(newTask){
        let num = task.length + 1;
        let getTask = {id: num, title: newTask, status: false}
        setTask([...task, getTask]);
        setNewTask('');
      }
  }

  const deleteTask = (id)=>{
      let dltTask = task.filter( task => task.id !== id)
      setTask(dltTask);
  }

  const doneTask = (id)=>{
      let markTask = task.map( task=>{
          if(task.id === id){
            return ({...task, status: !task.status})
          }
        return task;  
      });
      setTask(markTask);
  }

  const cancelTask = ()=>{
    setUpdateTask('');
  }

  const changeTask = (e)=>{
      let alterTask = {
        id: updateTask.id,
        title: e.target.value,
        status: updateTask.status
      }
      setUpdateTask(alterTask);
  }

  const editTask = ()=>{
      let AddTask = [...task].filter( task=> task.id !== updateTask.id);
      let FilterTask = [...AddTask, updateTask]
      setTask(FilterTask);
      setUpdateTask('');
  }


  return (
    <div className="App">
      
      <Header className="App-header" title="TaskManager" searchBar={false} /> 
      <div className="container my-3">
        {updateTask && updateTask ? (
          <EditTasks updateTask={updateTask} editTask={editTask} changeTask={changeTask} cancelTask={cancelTask} />
        ) : (
          <AddTasks newTask={newTask} setNewTask={setNewTask} addTask={addTask}/>
        )}

        <Tasks task={task} doneTask={doneTask} setUpdateTask={setUpdateTask} deleteTask={deleteTask}  />        
      </div> 
      
      
      
    </div>
  );
}

export default App;
