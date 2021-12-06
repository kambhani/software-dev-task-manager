import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Task = ({Index, Title, Date, Description, Tags, Status, Display, DeleteTask, MarkTaskAsCompleted, StartTaskEditing}) => {
  return (
    <div className={"w-full lg:w-5/12 bg-purple-200 p-3 my-5 shadow-lg dark:bg-gray-900 dark:text-gray-100" + ((Status === "Completed") ? " opacity-50": "") + ((Display) ? "" : " hidden")}>
      <div className="flex justify-between">
        <Tippy content="Mark task as complete">
          <button className={"text-center border-0 my-0 mx-3 p-3 rounded-full bg-green-600 " + ((Status === "Completed") ? "pointer-events-none" : "hover:bg-green-700")} aria-label="Mark task as completed" disabled={(Status === "Completed") ? true : false} onClick={() => MarkTaskAsCompleted(Index)}>
            {/*This code was taken from: https://icons.getbootstrap.com/icons/check2/, licensed MIT*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-label="Check mark icon">
              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
            </svg>
          </button>
        </Tippy>
        <Tippy content="Edit task">
          <button className={"text-center border-0 my-0 mx-3 p-3 rounded-full bg-gray-400 " + ((Status === "Completed") ? "pointer-events-none" : "hover:bg-gray-500")} aria-label="Edit task" disabled={(Status === "Completed") ? true : false} onClick={() => StartTaskEditing(Index)}>
            {/*This code was taken from: https://icons.getbootstrap.com/icons/pencil/, licensed MIT*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-label="Pencil icon">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </Tippy>
        <Tippy content="Delete task">
          <button className={"text-center border-0 my-0 mx-3 p-3 rounded-full " + ((Status === "Completed" ? "bg-red-800 hover:bg-red-900" : "bg-red-600 hover:bg-red-700"))} aria-label="Delete task" onClick={() => DeleteTask(Index)}>
            {/*This code was taken from: https://icons.getbootstrap.com/icons/x-lg/, licensed MIT*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-label="X icon">
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </button>
        </Tippy>
      </div>
      {/* Task Title*/}
      <h2 className="text-left mt-4 text-3xl">{Title}</h2>
      {/* Task Date*/}
      <p className="text-left text-lg italic">{Date}</p>
      {/* Task Description*/}
      <p className="text-justify">{Description}</p>
      {/* Task Tags*/}
      <p className="my-3 border-t-4 border-gray-900 dark:border-gray-100"><small>{Tags}</small></p>
    </div>
  )
}

export default Task;