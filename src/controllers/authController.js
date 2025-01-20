const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const createUser = async(req, res) => {
    const { name, email, password } = req.body

    try{
        const user = await User.create({name, email, password})
        res.status(200).json({success: true, data: user})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({email})
        if(!user || !(await user.comparePasswords(password))){
            return res.status(401).json({success: false, message: 'Invalid credentials'})
        }
        const token = await generateToken(user._id)
        res.status(200).json({success: true, data: {user, token}})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const getAllUsers = async(req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({success: true, data: users})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const getUserById = async(req, res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id)
        if(!user) return res.status(404).json({success: false, message: 'User not found'})
        res.status(200).json({success: true, data: user})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const updateUser = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!user) return res.status(404).json({success: false, message: 'User not found'})
        res.status(200).json({success: true, data: user})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

const deleteUser = async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).json({success: false, message: 'User not found'})
        res.status(200).json({success: true, message: 'User deleted successfully!'})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = {createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser}