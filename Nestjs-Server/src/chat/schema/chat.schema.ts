import mongoose from 'mongoose';
import { Chat, Message } from '../interface/chat.interface';

export const MessageSchema = new mongoose.Schema<Message>(
  {
    buyerId: { type: String, required: true },
    vendorId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: false },
);

export const ChatSchema = new mongoose.Schema<Chat>(
  {
    productId: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    messageContent: { type: MessageSchema, required: true }, // Corrected array type
  },
  { timestamps: true },
);

export const MessageModel = mongoose.model<Message>('Message', MessageSchema);
export const ChatModel = mongoose.model<Chat>('Chat', ChatSchema);
