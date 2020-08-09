import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Query, Req } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePrivateMessageDto } from './dto/create-private-message-dto';

@ApiTags('discussions')
@Controller('discussions')
export class DiscussionsController {
  constructor(private discussionService: DiscussionsService) {}

  @Get()
  async getAllPrivateMessages(@Req() req: any) {
    let userId = req.user._id;
    return await this.discussionService.getPrivateMessagesByUserIdAndSaleId(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createPrivateMessage(@Req() req: any, @Body() createPrivateMessageDto: CreatePrivateMessageDto) {
    let userId = req.user._id;
    return await this.discussionService.createPrivateMessage(userId, createPrivateMessageDto)
  }
}
