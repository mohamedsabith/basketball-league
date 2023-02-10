import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LEAGUE_NAME_TAKEN, LEAGUE_NOT_FOUND } from 'src/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';

@Injectable()
export class LeagueAdminService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}

  async leagueCreate(createLeagueDto: CreateLeagueDto) {
    //league existing
    if (this.getLeagueByName(createLeagueDto.name)) {
      throw new NotAcceptableException(LEAGUE_NAME_TAKEN);
    }

    return await this.leagueRepository.save({
      entry_fee: createLeagueDto.entryFee,
      ...createLeagueDto,
    });
  }

  async getLeagueByName(league: string) {
    return await this.leagueRepository.findOne({ where: { name: league } });
  }

  async leagueUpdate(id: string, updateLeagueDto: UpdateLeagueDto) {
    return await this.leagueRepository.update(
      { id: id },
      { ...updateLeagueDto },
    );
  }

  async leagueDelete(id: string) {
    return await this.leagueRepository.delete({ id });
  }

  async getLeagueById(id: string) {
    const league = await this.leagueRepository.findOne({ where: { id } });
    if (!league) {
      throw new NotAcceptableException(LEAGUE_NOT_FOUND);
    }
    return league;
  }

  async getAllLeagues() {
    const leagues = await this.leagueRepository.find();
    if (leagues.length === 0) {
      throw new NotAcceptableException(LEAGUE_NOT_FOUND);
    }
    return leagues;
  }
}
