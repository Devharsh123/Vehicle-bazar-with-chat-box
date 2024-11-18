import mongoose, { Document } from "mongoose";

export class Todo extends Document{
    readonly user: string;
    readonly task: string;
}

export const TodoSchema = new mongoose.Schema<Todo>({
    user: String,
    task: String,
})

