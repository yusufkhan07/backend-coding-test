import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as passportCustom from 'passport-custom';
import { Request } from 'express';

import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  passportCustom.Strategy,
  'firebase',
) {
  constructor() {
    super({});
  }

  async authenticate(request: Request) {
    try {
      if (!request.headers.authorization) {
        throw new UnauthorizedException();
      }

      const token = request.headers.authorization.split(' ')[1];

      const decodedToken = await admin.auth().verifyIdToken(token);

      this.success(decodedToken);
    } catch (err) {
      this.error(new UnauthorizedException());
    }
  }
}
