import {
  Controller,
  Param,
  UseGuards,
  Post,
  Body,
  UseInterceptors,
  NotAcceptableException,
  UploadedFiles,
  Get,
} from '@nestjs/common';
import * as path from 'path';
import { SuperadminService } from './superadmin.service';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Roles, UserRole } from 'src/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  @ApiBearerAuth()
  @Post('league-admin/:id')
  @Roles(UserRole.SUPERADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  leagueAdminApproval(@Param('id') id: string) {
    return this.superadminService.leadueAdminApproval(id);
  }

  @Post('court')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'thumb_image', maxCount: 4 },
      ],
      {
        limits: { fileSize: 1024 * 1024 * 5 },
        fileFilter(req, file, callback) {
          const ext = path.extname(file.originalname);
          if (ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
            return callback(null, true);
          }
          req.fileValidationError = 'Invalid file type';
          return callback(
            new NotAcceptableException('Invalid file type'),
            false,
          );
        },
      },
    ),
  )
  @ApiBearerAuth()
  @Roles(UserRole.SUPERADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  courtcreation(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      thumb_image?: Express.Multer.File[];
    },
    @Body() courtData: CreateCourtDto,
  ) {
    return this.superadminService.courtcreation(courtData, files);
  }

  @Post('court/:id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'thumb_image', maxCount: 4 },
      ],
      {
        limits: { fileSize: 1024 * 1024 * 5 },
        fileFilter(req, file, callback) {
          const ext = path.extname(file.originalname);
          if (ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
            return callback(null, true);
          }
          req.fileValidationError = 'Invalid file type';
          return callback(
            new NotAcceptableException('Invalid file type'),
            false,
          );
        },
      },
    ),
  )
  @Roles(UserRole.SUPERADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  updateCourt(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      thumb_image?: Express.Multer.File[];
    },
    @Param('id') id: string,
    @Body() courtData: UpdateCourtDto,
  ) {
    return this.superadminService.updateCourt(id, files, courtData);
  }

  @Get('court/:id')
  @Roles(UserRole.SUPERADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @ApiBearerAuth()
  courtById(@Param('id') id: string) {
    return this.superadminService.getCourtById(id);
  }

  @Get('court')
  @Roles(UserRole.SUPERADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @ApiBearerAuth()
  allCourts() {
    return this.superadminService.getAllCourts();
  }
}
