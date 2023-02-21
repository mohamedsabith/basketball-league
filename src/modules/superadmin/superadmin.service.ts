import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Status } from 'src/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueAdmin } from '../league-admin/entities/league-admin.entity';
import { CreateCourtDto } from './dto/create-court.dto';
import { Court } from './entities/court.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectRepository(LeagueAdmin)
    private leagueAdminRepository: Repository<LeagueAdmin>,
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
    private clodinaryService: CloudinaryService,
  ) {}
  leadueAdminApproval(id: string) {
    return this.leagueAdminRepository.update(
      { id },
      { status: Status.APPROVED },
    );
  }
  async courtcreation(CreateCourtDto: CreateCourtDto, files) {
    // existing court name
    const existingCourtName = await this.courtRepository.findOne({
      where: { name: CreateCourtDto.name },
    });
    if (existingCourtName) {
      throw new NotAcceptableException(
        'Oops! This court name is already taken!',
      );
    }

    const image = await this.uploadImageToCloudinary(files.image);
    const image_thumb = await this.uploadImageToCloudinary(files.thumb_image);

    return await this.courtRepository.save({
      ...CreateCourtDto,
      image: image[0],
      image_thumb,
    });
  }

  async updateCourt(id, files, courtData) {
    if (
      !(await this.courtRepository.findOne({
        where: { id },
      }))
    ) {
      throw new NotAcceptableException('Oops! Court Not Found');
    }
    if (files.image && files.thumb_image) {
      const image = await this.uploadImageToCloudinary(files.image);
      const image_thumb = await this.uploadImageToCloudinary(files.thumb_image);
      return await this.courtRepository.update(
        { id },
        { ...courtData, image_thumb, image: image[0] },
      );
    }
    if (files.image) {
      const image = await this.uploadImageToCloudinary(files.image);

      return await this.courtRepository.update(
        { id },
        { ...courtData, image: image[0] },
      );
    }
    if (files.thumb_image) {
      const image_thumb = await this.uploadImageToCloudinary(files.thumb_image);
      return await this.courtRepository.update(
        { id },
        { ...courtData, image_thumb },
      );
    }
  }

  async getCourtById(id) {
    const Court = await this.courtRepository.findOne({
      where: { id },
    });
    if (!Court) {
      throw new NotAcceptableException('Oops! Court Not Found');
    }
    return Court;
  }

  async getAllCourts() {
    const Court = await this.courtRepository.find();
    if (!Court) {
      throw new NotAcceptableException('Oops! Court Not Found');
    }
    return Court;
  }

  async uploadImageToCloudinary(files: Array<Express.Multer.File>) {
    const urls = [];

    if (files === undefined) {
      return [];
    }

    for (let i = 0; i < files.length; i++) {
      const result = await this.clodinaryService.uploadImage(files[i]);
      urls.push(result.url);
    }
    return urls;
  }
}
