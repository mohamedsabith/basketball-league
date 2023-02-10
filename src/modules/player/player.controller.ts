import { Controller, Get, Post } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create() {
    return this.playerService.create();
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }
}