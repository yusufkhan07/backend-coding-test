import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { FirebaseAuthUserCreatedEventHandler } from './event-handlers/firebase-auth-user-created.event-handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, FirebaseAuthUserCreatedEventHandler],
  controllers: [UsersController],
})
export class UsersModule {}
