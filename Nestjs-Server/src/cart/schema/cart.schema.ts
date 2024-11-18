import mongoose, { Document } from 'mongoose';

export interface Cart extends Document {
  readonly u_id: mongoose.Schema.Types.ObjectId;
  readonly p_id: mongoose.Schema.Types.ObjectId;
  readonly isAdded: boolean;
}

export const CartSchema = new mongoose.Schema<Cart>({
  u_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  p_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  isAdded: {
    type: Boolean,
    default: false,
  },
});
