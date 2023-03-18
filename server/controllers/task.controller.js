const mongoose = require('mongoose');
const User = mongoose.model('User');
const Task = require('../models/task.model');
module.exports.add = async(req, res, next) => {
    var taskData = {};
    var task = Task.taskModel;
    taskData.taskName = req.body.taskName;
    taskData.description = req.body.description;
    taskData.status = req.body.status;
    taskData.assignedBy = req.body.assignedBy;
    taskData.assignedTo = req.body.assignedTo;
    let response = await task.insertMany([taskData]);
    res.status(200).json({response});
}

module.exports.edit = async(req, res, next) => {
    var taskData = {};
    var task = Task.taskModel;
    taskData.taskName = req.body.taskName;
    taskData.description = req.body.description;
    taskData.status = req.body.status;
    taskData.assignedTo = req.body.assignedTo;
    let response = await task.updateOne({_id:req.body._id},{$set:taskData});
    res.status(200).json({response});
}

module.exports.delete = async(req, res, next) => {
    taskId = req.params.id;
    let response = await Task.taskModel.deleteOne({_id:taskId});
    res.status(200).json({response});
}

module.exports.findMyTask = async(req, res, next) => {
    userId = req.params.id;
    role = req.params.role;
    if(role == 'builder'){
        var response = await Task.taskModel.find({assignedBy:userId});
    }
    else if(role == 'architect'){
        var response = await Task.taskModel.find({assignedTo:userId});
    }
    else{
        var response = await Task.taskModel.find();
    }
    res.status(200).json(response);
}

module.exports.getTask = async(req, res, next) => {
    taskId = req.params.id;
    let response = await Task.taskModel.findOne({_id:taskId});
    res.status(200).json(response);
}

module.exports.fetchAllArchitect = async(req,res,next) => {
    let response = await User.find({role:'architect'});
    res.status(200).json(response);
}

