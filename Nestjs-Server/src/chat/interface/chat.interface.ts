import mongoose, { Document } from 'mongoose';

export interface Message extends Document {
  readonly buyerId: string;
  readonly vendorId: string;
  readonly content: string;
}

export interface Chat extends Document {
  readonly productId: string;
  readonly senderId: string;
  readonly receiverId: string;
  readonly messageContent: Message;
}
