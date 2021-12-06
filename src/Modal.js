import React from 'react';
import Tasks from './Tasks';

const Modal = ({theme, setTheme, caseSensitiveFilter, setCaseSensitiveFilter, tasks, setTasks, taskTitle, task, setTask, taskIndex, modalDisplay, setModalDisplay}) => {
  // Handles the actions associated with closing the modal
  const handleModalClose = () => {
    document.getElementById('modalContent').classList.remove('modal-fade-in');
    document.getElementById('modalContent').classList.add('modal-fade-out');
    setTimeout(() => {
      document.getElementById('modalContent').classList.add('modal-fade-in');
      document.getElementById('modalContent').classList.remove('modal-fade-out');
      setModalDisplay('hidden');
    }, 200);
  }

  // Handles the actions associated with a theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    switch (newTheme) {
      case ('default'): {
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        break;
      }
      case ('light'): {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        break;
      }
      case ('dark'): {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
        break;
      }
      default: {
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        break;
      }
    }
  }

  // Handles the actions associated with either a task creation or update
  const handleTaskCreationOrUpdate = () => {
    if (taskTitle === "Add Task") {
      // A task is being added
      setTasks([...tasks, task]);
    } else {
      // A task is being editied
      const newTasks = tasks.map((oldTask, loopIndex) => (
        (taskIndex === loopIndex) ? task : oldTask
      ));
      setTasks(newTasks);
    }
    handleModalClose();
  }

  return (
    <div id="modal" className={modalDisplay + " left-0 top-0 z-10 pt-8 w-full h-full bg-gray-300 bg-opacity-75"} onClick={() => handleModalClose()}>
      <div id="modalContent" className="relative bg-gray-50 py-8 w-11/12 sm:w-5/6 h-auto max-h-full m-auto border-green-400 border-4 rounded-xl overflow-scroll dark:bg-gray-900 dark:text-gray-100 dark:border-green-800 modal-fade-in" onClick={(event) => event.stopPropagation()}>
        <button className="absolute top-3 right-3 border-0 text-gray-400 hover:text-gray-500">
          {/*This svg was taken from: https://icons.getbootstrap.com/icons/x-lg/, licensed MIT*/}
          <svg id="modal_close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-label="X icon" onClick={() => handleModalClose()}>
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        </button>
        {/* The below div is for settings */}
        <div className={(taskTitle === "") ? "" : "hidden"}>
          <h1 className="font-bold text-xl text-center mb-5">Settings</h1>
          <label>
            <div className="grid grid-cols-12">
              <div className="m-3 col-span-12 sm:col-span-6">
                <span className="text-gray-700 dark:text-gray-200">Application theme</span>
                <select className="form-select w-full mt-1 p-2 border-2 border-gray-700 dark:border-gray-200 dark:bg-black" value={theme} onChange={(event) => handleThemeChange(event.target.value)}>
                  <option value='default'>System default</option>
                  <option value='light'>Light</option>
                  <option value='dark'>Dark</option>
                </select>
              </div>
              <div className="m-3 col-span-12 sm:col-span-6">
                <span className="text-gray-700 dark:text-gray-200">Case Sensitive Filtering</span>
                <select className="form-select w-full mt-1 p-2 border-2 border-gray-700 dark:border-gray-200 dark:bg-black" value={caseSensitiveFilter} onChange={(event) => setCaseSensitiveFilter(event.target.value)}>
                  <option value='on'>On</option>
                  <option value='off'>Off</option>
                </select>
              </div>
            </div>
          </label>
        </div>
        {/* The below div is for adding and editing a task */}
        <div className={(taskTitle === "") ? "hidden" : ""}>
          <h1 className="font-bold text-xl text-center mb-5">{taskTitle}</h1>
          <div className="grid grid-cols-12">
            <div className="m-3 col-span-12 sm:col-span-6">
              <span className="text-gray-700 dark:text-gray-200">Task title</span>
              <input className="form-input w-full p-1 outline-none block border-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-700 focus:ring focus:ring-purple-300 dark:focus:ring-purple-800 focus:ring-opacity-50" type="text" placeholder="Type your task title in here" value={task.title} onChange={(e) => setTask({...task, title: e.target.value})}/>
            </div>
            <div className="m-3 col-span-12 sm:col-span-6">
              <span className="text-gray-700 dark:text-gray-200">Task date</span>
              <input className="form-input w-full p-1 outline-none block border-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-700 focus:ring focus:ring-purple-300 dark:focus:ring-purple-800 focus:ring-opacity-50" type="date" value={task.date} onChange={(e) => setTask({...task, date: e.target.value})}/>
            </div>
            <div className="m-3 col-span-12 sm:col-span-6">
              <span className="text-gray-700 dark:text-gray-200">Task description</span>
              <textarea className="form-textarea w-full h-24 p-1 outline-none block border-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-700 focus:ring focus:ring-purple-300 dark:focus:ring-purple-800 focus:ring-opacity-50" rows="3" placeholder="Type your task description in here" value={task.description} onChange={(e) => setTask({...task, description: e.target.value})}></textarea>
            </div>
            <div className="m-3 col-span-12 sm:col-span-6">
              <span className="text-gray-700 dark:text-gray-200">Task tags</span>
              <textarea className="form-textarea w-full h-24 p-1 outline-none block border-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-700 focus:ring focus:ring-purple-300 dark:focus:ring-purple-800 focus:ring-opacity-50" rows="3" placeholder="Type your task tags in here" value={task.tags} onChange={(e) => setTask({...task, tags: e.target.value})}></textarea>
            </div>
          </div>
          <div className="flex justify-end px-3">
            <button className="w-20 rounded-md py-2 mr-6 font-semibold bg-red-400 dark:bg-red-600 dark:text-gray-200" onClick={() => handleModalClose()}>Cancel</button>
            <button className="w-20 rounded-md py-2 font-semibold bg-blue-400 dark:bg-blue-600 dark:text-gray-200" onClick={() => handleTaskCreationOrUpdate()}>{(taskTitle === "Add Task") ? "Create" : "Update"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;