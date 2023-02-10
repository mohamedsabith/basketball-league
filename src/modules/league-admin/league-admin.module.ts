import { Module } from '@nestjs/common';
import { LeagueAdminService } from './league-admin.service';
import { LeagueAdminController } from './league-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { League } from './entities/league.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League, User])],
  controllers: [LeagueAdminController],
  providers: [LeagueAdminService, CloudinaryService],
})
export class LeagueAdminModule {}
