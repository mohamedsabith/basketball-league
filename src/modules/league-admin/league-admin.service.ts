import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { User } from '../auth/entities/user.entity';
import { LEAGUE_NAME_TAKEN, LEAGUE_NOT_FOUND, Status } from 'src/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class LeagueAdminService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private clodinaryService: CloudinaryService,
  ) {}

  async leagueCreate(
    email: string,
    file: Express.Multer.File,
    createLeagueDto: CreateLeagueDto,
  ) {
    //league existing
    if (await this.getLeagueByName(createLeagueDto.name)) {
      throw new NotAcceptableException(LEAGUE_NAME_TAKEN);
    }

    const leagueAdmin = await this.userRepository.findOne({ where: { email } });

    if (leagueAdmin.leagueAdminDetails.status === Status.APPROVED) {
      if (file) {
        const imageUrl = await this.clodinaryService.uploadImage(file);
        return await this.leagueRepository.save({
          image: imageUrl.secure_url,
          ...createLeagueDto,
        });
      }
      return await this.leagueRepository.save({
        ...createLeagueDto,
      });
    }

    throw new NotAcceptableException('you are not authorized to create league');
  }

  async getLeagueByName(league: string) {
    return await this.leagueRepository.findOne({ where: { name: league } });
  }

  async leagueUpdate(
    id: string,
    file: Express.Multer.File,
    updateLeagueDto: UpdateLeagueDto,
  ) {
    if (file) {
      const imageUrl = await this.clodinaryService.uploadImage(file);
      return await this.leagueRepository.update(
        { id: id },
        {
          ...updateLeagueDto,
          image: imageUrl.secure_url,
        },
      );
    }
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
