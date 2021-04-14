import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { InSignUpDto } from './dto/in-signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: InSignUpDto) {
    return this.authService.signup(dto);
  }
}
