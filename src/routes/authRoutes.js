const express = require('express')
const { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/authController')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router