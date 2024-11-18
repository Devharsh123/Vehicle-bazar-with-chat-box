import { Connection, Mongoose } from 'mongoose';
import { CartSchema } from './schema/cart.schema';

export const cartProviders = [
  {
    provide: 'CART_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('CART', CartSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
