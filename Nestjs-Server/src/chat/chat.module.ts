import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { chatProviders } from './chat.provider';
import { ChatService } from './chat.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, ...chatProviders],
  imports: [DatabaseModule],
  exports: [ChatService],
})
export class ChatModule {}
