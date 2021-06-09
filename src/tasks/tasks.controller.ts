import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Request, Res } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    async createTask(@Request() req, @Res() res, @Body() createTaskDto: CreateTaskDto) {
        const task = await this.tasksService.createTask(createTaskDto);
        return res.status(HttpStatus.CREATED).json({
            // message: 'task was created successfully',
            task
        });
    }

    @Get()
    async getAllTasks(@Res() res) : Promise<Task[]>  {
        const tasks = await this.tasksService.getAllTasks();
        if (tasks) {
            return res.status(HttpStatus.OK).json(tasks);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Dont have any tasks',
            })
        }
    }

    @Get(':taskId')
    async getTaskById(@Res() res, @Param('taskId') taskId: String) : Promise<Task> {
        const task = await this.tasksService.getSingleTask(taskId);
        if (task) {
            return res.status(HttpStatus.OK).json(task);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Not found any task',
            })
        }
    }

    @Put(':taskId')
    async updateTask(@Res() res, @Param('taskId') taskId: String, @Body() updateTaskDto: UpdateTaskDto) : Promise<Task> {
        const task = await this.tasksService.updateTask(taskId, updateTaskDto);
        return res.status(HttpStatus.OK).json(task);
    }

    @Delete(':taskId')
    async deleteTask(@Res() res, @Param('taskId') taskId: String) {
        await this.tasksService.deleteTask(taskId);
        return res.status(HttpStatus.OK).json({
            message: 'Delete task successfully',
        })
    }
}
