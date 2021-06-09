import * as mongoose from 'mongoose';
import { Priority } from 'src/tasks/Priority';

export const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 6,
        maxlength: 100,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: Priority,
        required: true,
    }
})