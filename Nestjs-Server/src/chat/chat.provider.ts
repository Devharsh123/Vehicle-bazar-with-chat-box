import { Mongoose } from 'mongoose';
import { ChatSchema } from './schema/chat.schema';

export const chatProviders = [
  {
    provide: 'CHAT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('CHATS', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
