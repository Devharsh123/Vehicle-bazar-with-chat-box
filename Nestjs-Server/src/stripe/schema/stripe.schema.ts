import * as mongoose from 'mongoose';

export interface OrderItem extends Document {
  readonly u_id: mongoose.Schema.Types.ObjectId;
  readonly p_id: mongoose.Schema.Types.ObjectId;
  readonly prodName: string;
  readonly noOfDays: string;
  readonly totalAmount: number;
}

export const OrderItemSchema = new mongoose.Schema<OrderItem>(
  {
    u_id: { type: mongoose.Schema.Types.ObjectId },
    p_id: { type: mongoose.Schema.Types.ObjectId },
    prodName: { type: String, required: true },
    noOfDays: { type: String, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true },
);

// import * as mongoose from 'mongoose';
// import {
//   Order,
//   OrderItem,
//   ShippingDetails,
// } from '../interface/orders.interface';

// const ShippingDetailSchema = new mongoose.Schema<ShippingDetails>({
//   customerName: { type: String, required: true },
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   contact: { type: Number, required: true },
// });

// export const OrderItemSchema = new mongoose.Schema<OrderItem>(
//   {
//     u_id: { type: mongoose.Schema.Types.ObjectId },
//     p_id: { type: mongoose.Schema.Types.ObjectId },
//     prodName: { type: String, required: true },
//     noOfDays: { type: String, required: true },
//     totalPrice: { type: Number, required: true },
//   },
//   { timestamps: true },
// );

// export const OrderSchema = new mongoose.Schema<Order>(
//   {
//     orderItems: { type: OrderItemSchema, required: true },
//     shippingDetail: { type: ShippingDetailSchema, required: true },
//   },
//   { timestamps: true },
// );

// import mongoose, { Document } from 'mongoose';

// export interface ShippingDetails extends Document {
//   readonly customerName: string;
//   readonly email: string;
//   readonly address: string;
//   readonly city: string;
//   readonly state: string;
//   readonly contact: number;
// }

// export interface OrderItem extends Document {
//   readonly u_id: mongoose.Schema.Types.ObjectId;
//   readonly p_id: mongoose.Schema.Types.ObjectId;
//   readonly prodName: string;
//   readonly noOfDays: string;
//   readonly totalPrice: number;
// }

// export interface Order extends Document {
//   readonly orderItems: OrderItem;
//   readonly shippingDetail: ShippingDetails;
// }

// import {
//   IsEmail,
//   IsInt,
//   IsMobilePhone,
//   IsNotEmpty,
//   IsString,
// } from 'class-validator';

// class ShippingDetailDto {
//   @IsString()
//   @IsNotEmpty()
//   customerName: string;

//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   address: string;

//   @IsString()
//   @IsNotEmpty()
//   city: string;

//   @IsString()
//   @IsNotEmpty()
//   state: string;

//   @IsMobilePhone()
//   contact: number;
// }

// class OrderItemDto {
//   @IsString()
//   @IsNotEmpty()
//   prodName: string;

//   @IsString()
//   noOfDays: string;

//   @IsInt()
//   totalPrice: number;
// }

// export class CreateOrderDto {
//   orderItems: OrderItemDto[];
//   shippingDetail: ShippingDetailDto;
// }
