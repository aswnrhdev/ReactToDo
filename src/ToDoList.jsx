import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

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
    <div className="to-do-list">
      <div className="card">
        <h1>TO DO GENESIS</h1>
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
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <ol className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={taskStatus[index]}
                onChange={() => toggleTaskStatus(index)}
              />
              <span
                style={{
                  textDecoration: taskStatus[index] ? "line-through" : "none",
                }}
              >
                {task}
              </span>
              {taskStatus[index] ? null : (
                <button className="edit" onClick={() => editTask(index)}>
                  <FaEdit />
                </button>
              )}
              <button className="delete" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="move-up" onClick={() => moveTaskUp(index)}>
                UP
              </button>
              <button
                className="move-down"
                onClick={() => moveTaskDown(index)}
              >
                DOWN
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ToDoList;
