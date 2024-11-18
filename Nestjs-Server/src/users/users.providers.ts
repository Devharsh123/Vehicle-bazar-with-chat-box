import { Connection, Mongoose } from "mongoose";
import { UserSchema } from "./schema/user.schema";

export const userProviders = [
    {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose)=> mongoose.model("Users",UserSchema),
    inject: ['DATABASE_CONNECTION']
    }
]