import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('Task')
        private readonly taskModel: Model<Task>
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new this.taskModel(createTaskDto);
        const result = await task.save();
        return result;
    }

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find().exec();
        return tasks;
    }

    async getSingleTask(taskId: String): Promise<Task> {
        try {
            const task = await this.taskModel.findById(taskId).exec();
            return task;
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async updateTask(taskId: String, updateTaskDto: UpdateTaskDto): Promise<Task> {
        try {
            const task = await this.taskModel.findByIdAndUpdate(taskId, updateTaskDto, {new: true}).exec();
            return task;
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async deleteTask(taskId: String) {
        await this.taskModel.findByIdAndDelete(taskId);
    }
}
