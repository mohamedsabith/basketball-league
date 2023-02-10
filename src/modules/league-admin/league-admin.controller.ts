import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LeagueAdminService } from './league-admin.service';

import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto, LeagueParamDto } from './dto/update-league.dto';

import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { UserRole, Roles } from 'src/common';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('league-admin')
export class LeagueAdminController {
  constructor(private readonly leagueAdminService: LeagueAdminService) {}

  @ApiBearerAuth()
  @Post('league')
  @Roles(UserRole.LEAGUEADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  createLeague(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueAdminService.leagueCreate(createLeagueDto);
  }

  @ApiBearerAuth()
  @Post('league/:id')
  @Roles(UserRole.LEAGUEADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  updateLeague(
    @Param()
    id: LeagueParamDto,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ) {
    return this.leagueAdminService.leagueUpdate(id.id, updateLeagueDto);
  }

  @ApiBearerAuth()
  @Delete('league/:id')
  @Roles(UserRole.LEAGUEADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  deleteLeague(
    @Param()
    id: LeagueParamDto,
  ) {
    return this.leagueAdminService.leagueDelete(id.id);
  }

  @ApiBearerAuth()
  @Get('league/:id')
  @UseGuards(JwtAuthenticationGuard)
  getLeague(
    @Param()
    id: LeagueParamDto,
  ) {
    return this.leagueAdminService.getLeagueById(id.id);
  }

  @ApiBearerAuth()
  @Get('league')
  @UseGuards(JwtAuthenticationGuard)
  getAllLeague() {
    return this.leagueAdminService.getAllLeagues();
  }
}
