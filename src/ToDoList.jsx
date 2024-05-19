import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaUser } from 'react-icons/fa';

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [taskStatus, setTaskStatus] = useState(() => {
    const savedStatus = localStorage.getItem("taskStatus");
    return savedStatus ? JSON.parse(savedStatus) : [];
  });

  const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    "Don’t let yesterday take up too much of today.",
    "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
    "It’s not whether you get knocked down, it’s whether you get up.",
    "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.",
    "People who are crazy enough to think they can change the world, are the ones who do.",
    "Failure will never overtake me if my determination to succeed is strong enough.",
    "We may encounter many defeats but we must not be defeated.",
    "Knowing is not enough; we must apply. Wishing is not enough; we must do."
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
  }, [tasks, taskStatus]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setNewTask("");
      setEditIndex(null);
    } else {
      if (newTask.trim() !== "") {
        if (!tasks.includes(newTask)) {
          setTasks([...tasks, newTask]);
          setTaskStatus([...taskStatus, false]);
          setNewTask("");
        } else {
          alert("Task already exists!");
        }
      } else {
        alert("Please type something below.");
      }
    }
  }

  function deleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    const updatedStatus = [...taskStatus];
    updatedStatus.splice(index, 1);
    setTasks(updatedTasks);
    setTaskStatus(updatedStatus);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      const updatedStatus = [...taskStatus];
      [updatedStatus[index], updatedStatus[index - 1]] = [
        updatedStatus[index - 1],
        updatedStatus[index],
      ];
      setTasks(updatedTasks);
      setTaskStatus(updatedStatus);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      const updatedStatus = [...taskStatus];
      [updatedStatus[index], updatedStatus[index + 1]] = [
        updatedStatus[index + 1],
        updatedStatus[index],
      ];
      setTasks(updatedTasks);
      setTaskStatus(updatedStatus);
    }
  }

  function editTask(index) {
    setNewTask(tasks[index]);
    setEditIndex(index);
  }

  function toggleTaskStatus(index) {
    const updatedStatus = [...taskStatus];
    updatedStatus[index] = !updatedStatus[index];
    setTaskStatus(updatedStatus);
  }

  return (
    <div className="app">
      <div className="background-image"></div>
      <div className="quote-container">
        <p className="quote">{quotes[quoteIndex]}</p>
      </div>
      <div className="to-do-list">
        <div className="card">
          <div className="input-card">
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handleInputChange}
                className="input-field"
              />
              <button className="add-button" onClick={addTask}>
                Add
              </button>
            </div>
          </div>
          <ol className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={taskStatus[index]}
                    onChange={() => toggleTaskStatus(index)}
                  />
                  <span
                    className={taskStatus[index] ? "task-completed" : "task-text"}
                  >
                    {task}
                  </span>
                </div>
                <div className="task-buttons">
                  <button className="button delete-button" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                  <button className="button move-up" onClick={() => moveTaskUp(index)}>
                    UP
                  </button>
                  <button className="button move-down" onClick={() => moveTaskDown(index)}>
                    DOWN
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
