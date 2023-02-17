import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from '../league-admin/entities/league.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async leagueRequest(user, id) {
    const league = await this.leagueRepository.findOne({
      where: { id },
    });

    league.requestedUsers.forEach((users) => {
      if (users.id === user.id) {
        throw new NotAcceptableException('You already requested this league.');
      }
    });

    league.requestedUsers.push(user);
    await this.leagueRepository.save(league);
    return league;
  }
}
