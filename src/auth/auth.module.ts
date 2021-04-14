import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthService } from './auth.service';

import { FirebaseStrategy } from './firebase.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, CqrsModule],
  providers: [AuthService, FirebaseStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
