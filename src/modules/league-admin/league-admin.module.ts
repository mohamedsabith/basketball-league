import { Module } from '@nestjs/common';
import { LeagueAdminService } from './league-admin.service';
import { LeagueAdminController } from './league-admin.controller';

@Module({
  controllers: [LeagueAdminController],
  providers: [LeagueAdminService]
})
export class LeagueAdminModule {}
