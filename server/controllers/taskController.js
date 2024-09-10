const Task = require('../models/taskModel');

// Get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
};

module.exports = { getTasks, createTask, deleteTask };
