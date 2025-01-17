const express = require('express')
const app = express()
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/authRoutes')

app.use(express.json())
app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to the Task Manager API")
})

module.exports = app