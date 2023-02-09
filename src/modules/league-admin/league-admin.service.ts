import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { CreateLeagueDto } from './dto/create-league.dto';
@Injectable()
export class LeagueAdminService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}

  leagueCreate(createLeagueDto: CreateLeagueDto) {
    return createLeagueDto;
  }
}
