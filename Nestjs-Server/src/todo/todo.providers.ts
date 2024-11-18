import { Mongoose } from "mongoose";
import { TodoSchema } from "./entities/todo.entity";

export const todoProviders = [
    {
        provide: 'TODO_MODEL',
        useFactory: (mongoose: Mongoose)=> mongoose.model("TODOS", TodoSchema),
        inject: ["DATABASE_CONNECTION"]
    }
]