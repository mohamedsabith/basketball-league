import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeagueAdminService } from './league-admin.service';
import { CreateLeagueAdminDto } from './dto/create-league-admin.dto';
import { UpdateLeagueAdminDto } from './dto/update-league-admin.dto';

@Controller('league-admin')
export class LeagueAdminController {
  constructor(private readonly leagueAdminService: LeagueAdminService) {}

  @Post()
  create(@Body() createLeagueAdminDto: CreateLeagueAdminDto) {
    return this.leagueAdminService.create(createLeagueAdminDto);
  }

  @Get()
  findAll() {
    return this.leagueAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leagueAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueAdminDto: UpdateLeagueAdminDto) {
    return this.leagueAdminService.update(+id, updateLeagueAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueAdminService.remove(+id);
  }
}
