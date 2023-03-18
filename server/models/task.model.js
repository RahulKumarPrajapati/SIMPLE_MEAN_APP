const mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: 'Task Name can\'t be empty'
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
    },
    status: {
        type: String,
        required: 'Status can\'t be empty',
    },
    assignedBy: {
        type: String,
        required: 'Assigned By Id can\'t be empty'
    },
    assignedTo: {
        type: String,
        required: 'Assigned To Id can\'t be empty'
    }
});

let TaskModel = mongoose.model("Task", taskSchema)

module.exports.taskModel = TaskModel