import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
  ) {}
  signup(createAuthDto: CreateAuthDto) {
    return 'hello';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
