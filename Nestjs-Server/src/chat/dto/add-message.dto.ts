import { IsString } from 'class-validator';
import { Message } from '../interface/chat.interface';

export class AddMessageDto {
  @IsString()
  productId: string;

  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;

  role: string;

  content: string;
}

export class GetMessageDto {
  @IsString()
  vendorId: string;

  role: string;
}
