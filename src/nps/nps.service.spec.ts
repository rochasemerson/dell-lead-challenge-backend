import { Test, TestingModule } from '@nestjs/testing';
import { NpsService } from './nps.service';

describe('NpsService', () => {
  let service: NpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpsService],
    }).compile();

    service = module.get<NpsService>(NpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
