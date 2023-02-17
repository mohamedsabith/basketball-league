import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { Roles, UserRole } from 'src/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/common';
import { LeagueRequestParamDto } from './dto/league-request.dto';
import { PlayerService } from './player.service';
import { User } from '../auth/entities/user.entity';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @ApiBearerAuth()
  @Post('league/:id')
  @Roles(UserRole.PLAYER)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  leagueRequest(@GetUser() user: User, @Param() id: LeagueRequestParamDto) {
    return this.playerService.leagueRequest(user, id.id);
  }
}
