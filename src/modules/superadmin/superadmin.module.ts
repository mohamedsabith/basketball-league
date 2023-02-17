import { Module } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminController } from './superadmin.controller';
import { User } from '../auth/entities/user.entity';
import { Player } from '../player/entities/player.entity';
import { LeagueAdmin } from '../league-admin/entities/league-admin.entity';
import { Court } from './entities/court.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Player, LeagueAdmin, Court])],
  controllers: [SuperadminController],
  providers: [SuperadminService],
})
export class SuperadminModule {}
