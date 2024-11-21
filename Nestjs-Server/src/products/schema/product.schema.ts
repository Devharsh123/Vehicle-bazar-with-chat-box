import * as mongoose from 'mongoose';
import { Product } from '../interface/product.interface';

export enum TransactionType {
  TORENT = 'TORENT',
  TOBUY = 'TOBUY',
}
export const ProductSchema = new mongoose.Schema<Product>(
  {
    u_id: mongoose.Schema.Types.ObjectId,
    name: String,
    imageUrl: String,
    brand: String,
    yearOfReg: String,
    registrationDescr: String,
    transactionType: {
      type: String,
      enum: TransactionType,
      default: TransactionType.TORENT,
    },
    kmDriven: String,
    availableLocation: String,
    pricePerDay: {
      type: String,
      required: false,
    },
    totalPrice: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    isVacant: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
