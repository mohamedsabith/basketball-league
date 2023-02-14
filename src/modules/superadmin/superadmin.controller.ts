import { Controller, Param, UseGuards, Post } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles, UserRole } from 'src/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  @ApiBearerAuth()
  @Post('league-admin/:id')
  @Roles(UserRole.SUPERADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  leagueAdminApproval(@Param('id') id: string) {
    return this.superadminService.leadueAdminApproval(id);
  }
}
