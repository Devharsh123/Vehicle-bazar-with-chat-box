import { Connection, Mongoose } from "mongoose";
import { ProductSchema } from "./schema/product.schema";

export const productProviders = [
    {
    provide: 'PRODUCT_MODEL',
    useFactory: (mongoose: Mongoose)=> mongoose.model("PRODUCTS", ProductSchema),
    inject: ['DATABASE_CONNECTION']
    }
]