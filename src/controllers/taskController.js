const Task = require('../models/Task')

const getAllTasks = async(req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json({success: true, data: tasks})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const createTask = async(req, res) => {
    try{
        const task = await Task.create(req.body)
        res.status(200).json({success: true, data: task})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const getTaskById = async(req, res) => {
    try{
        const id = req.body.id
        const task = await Task.findById(id)
        res.status(200).json({success: true, data: task})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!task){
            return res.status(404).json({success: false, message: "Task not found"})
        }
        res.status(200).json({success: true, data: task})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'})
        }
        res.status(200).json({success: true, message: 'Task successfully deleted!'})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = {getAllTasks, getTaskById, updateTask, createTask, deleteTask}