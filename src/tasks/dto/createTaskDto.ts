import { Priority } from "../Priority"

export class CreateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly priority: Priority;
}