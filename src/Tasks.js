import React, { useState } from 'react';
import Task from './Task';

const Tasks = ({caseSensitiveFilter, tasks, setTasks, openModal, setModalTaskTitle, setModalTask, setTaskIndex}) => {
  // Stores the text used for filtering, if any
  const [filterText, setFilterText] = useState("");
  // Stores what to filter the tasks by (title, date, description, etc.)
  const [filterBy, setFilterBy] = useState("all");

  // Starts task creation by opening up the modal
  function startTaskCreation() {
    setModalTaskTitle("Add Task");
    setModalTask({
      title: '',
      date: '',
      description: '',
      tags: '',
      status: 'In progress',
      display: true
    });
    openModal(1);
  }

  // Starts task editing by opening up the modal
  function startTaskEditing(index) {
    setModalTaskTitle("Edit Task");
    setModalTask(tasks[index]);
    setTaskIndex(index);
    openModal(1);
  }

  // Deletes a task when a user hits the delete button
  function deleteTask(index) {
    setTasks(tasks.slice(0,index).concat(tasks.slice(index + 1)));
  }

  // Marks a task as completed when the user hits the complete button
  function markTaskAsCompleted(index) {
    const newTasks = tasks.map((task, loopIndex) => {
      if (index === loopIndex) {
        return { ...task, status: "Completed"};
      }
      return { ...task}
    });
    setTasks(newTasks);
  }

  // Filters the tasks, if applicable
  function filterTasks(text, attribute) {
    let newDisplayValues = [];
    if (text === "") {
      for (let i = 0; i < tasks.length; i++) {
        newDisplayValues.push(true);
      }
    } else {
      for (let i = 0; i < tasks.length; i++) {
        let testString = (attribute === "all") ? tasks[i].title + tasks[i].date + tasks[i].description + tasks[i].tags + tasks[i].status : tasks[i][attribute];
        if (caseSensitiveFilter === "off") {
          testString = testString.toLowerCase();
          text = text.toLowerCase();
        }
        newDisplayValues.push(testString.includes(text));
      }
    }
    const newTasks = tasks.map((task, index) => {
      return { ...task, display: newDisplayValues[index]}
    });
    setTasks(newTasks);
  }

  // Updates the filter text and performs filtering, if applicable
  function updateFilterText(newText) {
    setFilterText(newText);
    filterTasks(newText, filterBy);
  }

  // Updates the filter attribute and performs filtering, if applicable
  function updateFilterBy(newFilterAttribute) {
    setFilterBy(newFilterAttribute);
    filterTasks(filterText, newFilterAttribute);
  }

  // Returns the formatted task cards
  return (
    <>
      {/* Displays the filtering bar */}
      <div className="px-5 mt-3 flex justify-center">
        <input className="max-w-lg w-full form-input p-1 outline-none block border-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-700 focus:ring focus:ring-purple-300 dark:focus:ring-purple-800 focus:ring-opacity-50" type="text" placeholder="Start typing to filter tasks" value={filterText} onChange={(e) => updateFilterText(e.target.value)}/>
        <select className="form-select p-2 bg-white border-2 border-gray-700 dark:border-gray-200 dark:bg-gray-800 dark:text-gray-100" value={filterBy} onChange={(e) => updateFilterBy(e.target.value)}>
          <option value='all'>All</option>
          <option value='title'>Title</option>
          <option value='date'>Date</option>
          <option value='description'>Description</option>
          <option value='tags'>Tags</option>
          <option value='status'>Status</option>
        </select>
      </div>
      {}
      <div className="px-5 mt-3 flex justify-center">
        <button className="p-2 max-w-md w-full bg-green-400 font-semibold rounded-md" onClick={() => startTaskCreation()}>Add new task</button>
      </div>
      {/* Displays the tasks */}
      <div className="flex px-5 justify-around flex-row flex-wrap">
        {
          tasks.map((task, index) => (
            <Task
              Index={index}
              Title={task.title}
              Date={task.date}
              Description={task.description}
              Tags={task.tags}
              Status={task.status}
              Display={task.display}
              DeleteTask={deleteTask}
              MarkTaskAsCompleted={markTaskAsCompleted}
              StartTaskEditing={startTaskEditing}
            />
          ))
        }
      </div>
    </>
  );
}

export default Tasks;