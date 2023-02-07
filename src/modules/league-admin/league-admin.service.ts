import { Injectable } from '@nestjs/common';
import { CreateLeagueAdminDto } from './dto/create-league-admin.dto';
import { UpdateLeagueAdminDto } from './dto/update-league-admin.dto';

@Injectable()
export class LeagueAdminService {
  create(createLeagueAdminDto: CreateLeagueAdminDto) {
    return 'This action adds a new leagueAdmin';
  }

  findAll() {
    return `This action returns all leagueAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leagueAdmin`;
  }

  update(id: number, updateLeagueAdminDto: UpdateLeagueAdminDto) {
    return `This action updates a #${id} leagueAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} leagueAdmin`;
  }
}
