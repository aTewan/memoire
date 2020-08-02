import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Query } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DUser } from '../users/user.decorator';
import { CreatePrivateMessageDto } from './dto/create-private-message-dto';

@ApiTags('discussions')
@Controller('discussions')
export class DiscussionsController {
  constructor(private discussionService: DiscussionsService) {}

  @Get()
  async getAllPrivateMessages(@DUser('id') userId: string) {
    return await this.discussionService.getPrivateMessagesByUserIdAndSaleId(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createPrivateMessage(@DUser('id') userId: string, @Body() createPrivateMessageDto: CreatePrivateMessageDto) {
    return await this.discussionService.createPrivateMessage(userId, createPrivateMessageDto)
  }
}
