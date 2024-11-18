import { Connection, Mongoose } from 'mongoose';
import { OrderItemSchema } from './schema/stripe.schema';

export const orderProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('ORDERS', OrderItemSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

// const session = await mongoose.startSession();
// session.startTransaction();
// try {
//   // const orderDoc = await this.orderModel.create([createOrderDto], {
//     session,
//   });
//   for (const item of orderDoc) {
//     console.log('item', item, 'item');
//     // const product = (
//     //   await this.productsService.findByIdAndUpdateVacancy(item._id)
//     // ).$session(session);
//   }
//   await session.commitTransaction();
//   return {
//     data: orderDoc,
//   };
// } catch (err) {
//   await session.abortTransaction();
//   throw err;
// } finally {
//   session.endSession();
// }
