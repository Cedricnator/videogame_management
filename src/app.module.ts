import { Module } from '@nestjs/common';
import { VideogameModule } from './videogame/videogame.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, VideogameModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
