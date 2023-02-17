import {
  Controller,
  Param,
  UseGuards,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Roles, UserRole } from 'src/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateCourtDto } from './dto/create-court.dto';
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
      { limits: { fileSize: 1024 * 1024 * 5 } },
    ),
  )
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
    console.log(files);

    return this.superadminService.courtcreation(courtData);
  }
}
