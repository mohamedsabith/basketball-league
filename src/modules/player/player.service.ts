import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  create() {
    return 'This action adds a new player';
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }
}
