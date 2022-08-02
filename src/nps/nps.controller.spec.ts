import { Test, TestingModule } from '@nestjs/testing';
import { NpsController } from './nps.controller';

describe('NpsController', () => {
  let controller: NpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpsController],
    }).compile();

    controller = module.get<NpsController>(NpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
