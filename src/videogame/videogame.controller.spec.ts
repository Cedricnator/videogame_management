import { Test, TestingModule } from '@nestjs/testing';
import { VideogameController } from './videogame.controller';
import { VideogameService } from './videogame.service';

describe('VideogameController', () => {
  let controller: VideogameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideogameController],
      providers: [VideogameService],
    }).compile();

    controller = module.get<VideogameController>(VideogameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
