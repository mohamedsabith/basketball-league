import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LeagueAdminService } from './league-admin.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { UserRole } from 'src/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('league-admin')
export class LeagueAdminController {
  constructor(private readonly leagueAdminService: LeagueAdminService) {}

  @Post('league')
  @Roles(UserRole.LEAGUEADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  createLeague(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueAdminService.leagueCreate(createLeagueDto);
  }
}
