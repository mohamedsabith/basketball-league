import { Injectable } from '@nestjs/common';
import { Status } from 'src/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueAdmin } from '../league-admin/entities/league-admin.entity';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectRepository(LeagueAdmin)
    private leagueAdminRepository: Repository<LeagueAdmin>,
  ) {}
  leadueAdminApproval(id: string) {
    return this.leagueAdminRepository.update(
      { id },
      { status: Status.APPROVED },
    );
  }
}
