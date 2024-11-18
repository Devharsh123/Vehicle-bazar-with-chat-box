import mongoose, { Document } from 'mongoose';

export interface Product extends Document {
  readonly u_id: mongoose.Schema.Types.ObjectId;
  readonly name: string;
  readonly imageUrl: string;
  readonly brand: string;
  readonly yearOfReg: string;
  readonly registrationDescr: string;
  readonly transactionType: string;
  readonly kmDriven: string;
  readonly availableLocation: string;
  readonly totalPrice: string;
  readonly pricePerDay: string;
  readonly avatar: string;
  readonly isVacant: boolean;
  readonly isVerified: boolean;
}
