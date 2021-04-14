import { Injectable, BadRequestException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import * as admin from 'firebase-admin';

import { FirebaseAuthUserCreatedEvent } from '../cqrs';

import { InSignUpDto } from './dto/in-signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly eventBus: EventBus) {}

  async signup(dto: InSignUpDto) {
    try {
      const user = await admin.auth().createUser({
        email: dto.email,
        password: dto.password,
        displayName: dto.name,
      });

      this.eventBus.publish(
        new FirebaseAuthUserCreatedEvent(
          user.uid,
          dto.name,
          dto.email,
          dto.dateOfBirth,
        ),
      );
    } catch (err) {
      if (err.errorInfo.code === 'auth/email-already-exists') {
        throw new BadRequestException('User already exists');
      }

      throw err;
    }
  }
}
