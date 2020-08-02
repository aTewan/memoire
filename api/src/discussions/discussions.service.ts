import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateMessage } from './pm.entity';
import { Repository } from 'typeorm';
import { CreatePrivateMessageDto } from './dto/create-private-message-dto';

@Injectable()
export class DiscussionsService {
  constructor(@InjectRepository(PrivateMessage) private readonly pmRepository: Repository<PrivateMessage>) {}

  async getPrivateMessagesByUserIdAndSaleId(userId: string) {
    const discussions = await this.pmRepository.find({
      where: {
        $or: [{ sender: userId }, { receiver: userId }]
      }
    });
    return discussions;
  }

  async createPrivateMessage(userId: string, createPrivateMessage: CreatePrivateMessageDto) {
    const { receiver, saleId, content } = createPrivateMessage;
    let pm = new PrivateMessage(userId, receiver, saleId, content);
    try {
      await this.pmRepository.save(pm);
      return pm;
    }
    catch (err) {
      throw new InternalServerErrorException(err);
      console.log(err);
    }
  }
}
