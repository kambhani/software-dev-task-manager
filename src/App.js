//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Tasks from './Tasks';
import Modal from './Modal';
import Header from './Header';

function App() {
  // Stores the application theme
  const [theme, setTheme] = useState('default');
  // Stores whether or not the filter functionality should be case sensitive
  const [caseSensitiveFilter, setCaseSensitiveFilter] = useState('on');
  // Stores whether nor not the modal is visible
  const [modalDisplay, setModalDisplay] = useState('hidden');
  // Stores the modal task title
  const [modalTaskTitle, setModalTaskTitle] = useState('');
  // Stores the task currently being created or edited in the modal
  const [modalTask, setModalTask] = useState({});
  // Stores the index of the task currently being edited in the modal
  const [taskIndex, setTaskIndex] = useState(-1);
  // Stores the yOffset of the screen whenever the modal is open (this is help lock page scrolling)
  const [yOffset, setYOffset] = useState(0);
  // Stores the list of tasks to be displayed
  const [tasks, setTasks] = useState([{title: 'Take Physics Final', date: '2021-12-15', description: 'Prepare for the physics final and take it', tags: '#physics #high-priority', status: 'In progress', display: true}, {title: 'Do Statistics Homework', date: '2021-12-13', description: 'Finish the review guide and submit through Canvas', tags: '#stats #medium-priority', status: 'In progress', display: true}, {title: 'Talk with Counselor About Naviance', date: '2022-12-01', description: 'Talk with my counselor about issues I\'ve been having with sending in teacher recommendations through Naviance', tags: '#college-apps #low-priority', status: 'Completed', display: true}]);

  // Prevents page scrolling when modal is open
  useEffect(() => {
    window.addEventListener("scroll", function(event) {
      if (this.document.getElementById("modal").classList.contains("fixed")) {
        this.window.scrollTo(0, yOffset);
      }
    });
  }, [modalDisplay]);

  // Opens the modal
  // It takes a single parameter
  // If the parameter is 0, then settings is being opened
  // If the parameter is 1, then task editing/creation is being opened
  function openModal(num) {
    if (num === 0) {
      setModalTaskTitle("");
      setModalTask({});
    }
    setYOffset(window.scrollY);
    setModalDisplay('fixed');
  }
  
  return (
    <div className="App">
      <Header
        openModal={openModal}
      />
      <Tasks
        tasks={tasks}
        setTasks={setTasks}
        caseSensitiveFilter={caseSensitiveFilter}
        openModal={openModal}
        setModalTaskTitle={setModalTaskTitle}
        setModalTask={setModalTask}
        setTaskIndex={setTaskIndex}
      />
      <Modal
        theme={theme}
        setTheme={setTheme}
        caseSensitiveFilter={caseSensitiveFilter}
        setCaseSensitiveFilter={setCaseSensitiveFilter}
        tasks={tasks}
        setTasks={setTasks}
        taskTitle={modalTaskTitle}
        task={modalTask}
        setTask={setModalTask}
        taskIndex={taskIndex}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
    </div>
  );
}

export default App;
