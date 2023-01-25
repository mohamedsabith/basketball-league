import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import {
  E_PASSWORD_INCORRECT,
  E_USER_EMAIL_TAKEN,
  E_USER_NOT_FOUND,
} from '../../common/exceptions';
import { PASSWORD_HASH_SALT } from '../../common/constants';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  //Verify user Password
  async verifyPassword(id: number, password: string) {
    const user = await this.authRepository.findOneById(id);
    if (!user) throw new NotFoundException(E_USER_NOT_FOUND);
    if (!(await bcrypt.compare(password, user.password)))
      throw new NotAcceptableException(E_PASSWORD_INCORRECT);
  }
  //Signup
  async signup(createAuthDto: CreateAuthDto) {
    // Check if there is a user with the same email
    const existingUser = await this.authRepository.findOne({
      where: { email: createAuthDto.email },
    });
    if (existingUser) {
      throw new NotAcceptableException(E_USER_EMAIL_TAKEN);
    }

    // Hashing the password: So that they are protected from whoever can access the database.
    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      PASSWORD_HASH_SALT,
    );

    // Save & return the new user
    return this.authRepository.save({
      ...createAuthDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
