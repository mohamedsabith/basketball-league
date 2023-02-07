import { PartialType } from '@nestjs/swagger';
import { CreateLeagueAdminDto } from './create-league-admin.dto';

export class UpdateLeagueAdminDto extends PartialType(CreateLeagueAdminDto) {}
