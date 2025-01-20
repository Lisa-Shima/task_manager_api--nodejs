const Task = require('../models/Task')

const getAllTasks = async(req, res) => {
    try{
        const tasks = await Task.find({ user: req.user._id});
        res.status(200).json({success: true, data: tasks})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const createTask = async(req, res) => {
    try{
        const task = await Task.create({...req.body, user: req.user._id})
        res.status(200).json({success: true, data: task})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const getTaskById = async(req, res) => {
    try{
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
        res.status(200).json({success: true, data: task})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
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
        const task = await Task.findByIdAndDelete({ _id: req.params.id, user: req.user._id })

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