const express = require('express')
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController')
const router = express.Router()
const { protect } = require('../middlewares/auth')

router.get('/', protect , getAllTasks)
router.get('/:id', protect, getTaskById)
router.post('/', protect , createTask)
router.put('/:id', protect , updateTask)
router.delete('/:id', protect , deleteTask)

module.exports = router