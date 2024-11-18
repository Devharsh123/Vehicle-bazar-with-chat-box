import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AddMessageDto, GetMessageDto } from './dto/add-message.dto';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  private logger = new Logger('ChatGateway');
  @SubscribeMessage('chat')
  async handleMessage(@MessageBody() payload: AddMessageDto) {
    this.logger.log(
      `Message received: ${payload.senderId} - ${payload.content}`,
    );
    await this.chatService.saveMessage(payload);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() payload: GetMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Message sent: ${payload.vendorId} with ${payload.role}`);
    const showAllChats = await this.chatService.getUserChats(payload);
    client.emit('messageHistory', showAllChats);
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
