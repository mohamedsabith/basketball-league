import { Module } from '@nestjs/common';
import { LeagueAdminService } from './league-admin.service';
import { LeagueAdminController } from './league-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League])],
  controllers: [LeagueAdminController],
  providers: [LeagueAdminService],
})
export class LeagueAdminModule {}
