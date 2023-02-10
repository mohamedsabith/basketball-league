import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
  Delete,
  Get,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Optional,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { LeagueAdminService } from './league-admin.service';

import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto, LeagueParamDto } from './dto/update-league.dto';

import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { UserRole, Roles } from 'src/common';
import { RolesGuard } from '../../guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('league-admin')
export class LeagueAdminController {
  constructor(private readonly leagueAdminService: LeagueAdminService) {}

  @ApiBearerAuth()
  @Post('league')
  @Roles(UserRole.LEAGUEADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  createLeague(
    @Req() req,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createLeagueDto: CreateLeagueDto,
  ) {
    const { email } = req.user;

    return this.leagueAdminService.leagueCreate(email, file, createLeagueDto);
  }

  @ApiBearerAuth()
  @Post('league/:id')
  @Roles(UserRole.LEAGUEADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  updateLeague(
    @Param()
    id: LeagueParamDto,
    @Optional()
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() updateLeagueDto: UpdateLeagueDto,
  ) {
    return this.leagueAdminService.leagueUpdate(id.id, file, updateLeagueDto);
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
