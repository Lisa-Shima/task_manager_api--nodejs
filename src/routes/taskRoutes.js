const express = require('express')
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController')
const router = express.Router()

router.get('/', getAllTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router