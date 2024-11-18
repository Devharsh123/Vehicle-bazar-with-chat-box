import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat, Message } from './interface/chat.interface';
import { AddMessageDto, GetMessageDto } from './dto/add-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_MODEL')
    private chatModel: Model<Chat>,
  ) {}

  async saveMessage(addMessageDto: AddMessageDto) {
    const { productId, senderId, receiverId, role, content } = addMessageDto;

    let message = {};
    if (role === 'USER') {
      message = {
        buyerId: senderId,
        vendorId: receiverId,
        content,
      };
    } else if (role === 'VENDOR') {
      message = {
        buyerId: receiverId,
        vendorId: senderId,
        content,
      };
    }

    let chat = new this.chatModel({
      productId,
      senderId,
      receiverId,
      messageContent: message,
    });
    await chat.save();

    return message;
  }

  // async getChatsMessage(getMessageDto: getMessageDto) {
  //   const { buyerId, vendorId } = getMessageDto;

  //   let chat = await this.chatModel.find({ buyerId, vendorId }).exec();
  // }

  async getUserChats(getMessageDto: GetMessageDto) {
    return await this.chatModel.aggregate([
      {
        $match: {
          $or: [
            { senderId: getMessageDto.vendorId },
            { receiverId: getMessageDto.vendorId },
          ],
        },
      },
      {
        $sort: { createdAt: 1 }, // Sort messages by creation date
      },
      {
        $group: {
          _id: {
            productId: '$productId',
            senderId: '$senderId',
            receiverId: '$receiverId',
            createdAt: '$createdAt',
          },
          messages: {
            $push: {
              content: '$messageContent.content',
              senderId: '$senderId',
              receiverId: '$receiverId',
              createdAt: '$createdAt',
            },
          },
        },
      },
      {
        $project: {
          productId: '$_id.productId',
          senderId: '$_id.senderId',
          receiverId: '$_id.receiverId',
          messages: 1,
          _id: 0,
        },
      },
    ]);

    // const conversations = await this.chatModel.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { senderId: getMessageDto.vendorId },
    //         { receiverId: getMessageDto.vendorId },
    //       ],
    //     },
    //   },
    //   {
    //     $unwind: '$messages', // Flatten the messages array
    //   },
    //   {
    //     $project: {
    //       content: '$messages.content',
    //       senderId: '$messages.senderId',
    //       receiverId: '$messages.receiverId',
    //       createdAt: '$messages.createdAt',
    //     },
    //   },
    //   {
    //     $sort: { createdAt: 1 }, // Sort by message creation date
    //   },
    // ]);
    // console.log(conversations);
    // conversations.map((convo) => {
    //   console.log(convo.messages);
    // });

    // return getMessageDto.role === 'VENDOR'
    //   ? this.chatModel
    //       .find({ receiverId: getMessageDto.vendorId })
    //       .sort({ timestamps: -1 })
    //       .exec()
    //   : this.chatModel
    //       .find({ senderId: getMessageDto.vendorId })
    //       .select('messages')
    //       .sort({ 'messages.timestamps': -1 })
    //       .exec();
  }
}
