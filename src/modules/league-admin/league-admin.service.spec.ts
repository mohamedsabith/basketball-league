import { Test, TestingModule } from '@nestjs/testing';
import { LeagueAdminService } from './league-admin.service';

describe('LeagueAdminService', () => {
  let service: LeagueAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeagueAdminService],
    }).compile();

    service = module.get<LeagueAdminService>(LeagueAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
