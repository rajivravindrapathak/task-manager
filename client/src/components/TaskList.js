import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, fetchTasks } from '../redux/taskSlice';

const TaskList = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const uncontrolledRef = useRef(null);  // Uncontrolled component

    // Fetch tasks when component mounts
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            dispatch(addTask({ title: inputValue }));
            setInputValue('');
        }
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    return (
        <div>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Controlled Input"
                />
                <input
                    type="text"
                    ref={uncontrolledRef}
                    placeholder="Uncontrolled Input"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title}
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
