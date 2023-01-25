import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Get()
  findAll() {
    return 'hello this auth service';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
}
