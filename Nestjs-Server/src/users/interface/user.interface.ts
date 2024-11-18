import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly age: number;
  readonly dob: string;
  readonly contact: string;
  readonly address: string;
  readonly country: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: number;
  readonly gender: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly isVerified: boolean;
}
