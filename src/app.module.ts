import { Module } from '@nestjs/common';
import { VideogameModule } from './videogame/videogame.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [VideogameModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
