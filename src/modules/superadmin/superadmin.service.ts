import { Injectable } from '@nestjs/common';
import { Status } from 'src/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueAdmin } from '../league-admin/entities/league-admin.entity';
import { CreateCourtDto } from './dto/create-court.dto';
import { Court } from './entities/court.entity';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectRepository(LeagueAdmin)
    private leagueAdminRepository: Repository<LeagueAdmin>,
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
  ) {}
  leadueAdminApproval(id: string) {
    return this.leagueAdminRepository.update(
      { id },
      { status: Status.APPROVED },
    );
  }
  async courtcreation(courtData: CreateCourtDto) {
    return await this.courtRepository.save({ ...courtData });
  }
}
