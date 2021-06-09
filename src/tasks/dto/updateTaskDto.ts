import { Priority } from "../Priority"

export class UpdateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly priority: Priority;
}