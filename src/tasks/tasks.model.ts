import { Priority } from "./Priority";

export interface Task extends Document {
    readonly title: string,
    readonly description: string,
    readonly priority: Priority,
}