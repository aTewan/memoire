import { Module, HttpModule } from '@nestjs/common';
import { DeezerController } from './deezer.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeezerController]
})
export class DeezerModule {}
