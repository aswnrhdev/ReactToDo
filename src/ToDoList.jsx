import React, {useState} from "react"

function ToDoList(){

    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){

        if(newTask.trim() !== ""){
            setTask(t  => [...t, newTask]);
            setNewTask("");
        }
        
    }

    function deleteTask(index){

        const updatedTask = tasks.filter((element, i) => i !== index);
        setTask(updatedTask);

    }

    function moveTaskUp(index){

        if(index > 0){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index-1]] = [updatedTask[index-1], updatedTask[index]]
            setTask(updatedTask);
        }

    }

    function moveTaskDown(index){

        if(index < tasks.length - 1){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index+1]] = [updatedTask[index+1], updatedTask[index]]
            setTask(updatedTask);
        }

    }

    return (
        <div className="to-do-list">

            <h1>tO-dO GENSIS</h1>
            <div>
                <input type="text"
                placeholder="Enter a task."
                value={newTask}
                onChange={handleInputChange} />

                <button className="add-button"
                onClick={addTask}>
                    ADD
                </button>
            </div>

            <ol>
                {tasks.map((tasks, index) => 
                <li key={index}>
                    <span className="text">{tasks}</span>
                    <button className="delete-button"
                    onClick={() => deleteTask(index)}>
                        DELETE
                    </button>

                    <button className="move-button"
                    onClick={() => moveTaskUp(index)}>
                        UP
                    </button>

                    <button className="move-button"
                    onClick={() => moveTaskDown(index)}>
                        DOWN
                    </button>
                </li>
            )}
            </ol>

        </div>
    );
}

export default ToDoList