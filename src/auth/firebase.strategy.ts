import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotImplementedException } from '@nestjs/common';
import * as passportCustom from 'passport-custom';
import { Request } from 'express';

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
      // validate request
      throw new NotImplementedException();
      this.success({});
    } catch (err) {
      this.error(err);
    }
  }
}
