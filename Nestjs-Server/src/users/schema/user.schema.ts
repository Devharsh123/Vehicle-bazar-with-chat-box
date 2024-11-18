import * as mongoose from 'mongoose';
export enum Role {
  VENDOR = 'VENDOR',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    dob: String,
    contact: String,
    address: String,
    country: String,
    city: String,
    state: String,
    zipCode: Number,
    gender: {
      type: String,
      enum: Gender,
      default: Gender.MALE,
    },
    email: String,
    password: String,
    role: {
      type: String,
      enum: Role,
      default: Role.USER,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
