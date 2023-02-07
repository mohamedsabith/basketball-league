import { Test, TestingModule } from '@nestjs/testing';
import { LeagueAdminController } from './league-admin.controller';
import { LeagueAdminService } from './league-admin.service';

describe('LeagueAdminController', () => {
  let controller: LeagueAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeagueAdminController],
      providers: [LeagueAdminService],
    }).compile();

    controller = module.get<LeagueAdminController>(LeagueAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
