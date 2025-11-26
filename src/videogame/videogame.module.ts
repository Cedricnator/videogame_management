import { Module } from '@nestjs/common';
import { VideogameService } from './VideogameService';
import { VideogameController } from './videogame.controller';

@Module({
  controllers: [VideogameController],
  providers: [VideogameService],
})
export class VideogameModule {}
