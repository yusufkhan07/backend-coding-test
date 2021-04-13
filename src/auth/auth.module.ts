import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { FirebaseStrategy } from './firebase.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, FirebaseStrategy],
})
export class AuthModule {}
