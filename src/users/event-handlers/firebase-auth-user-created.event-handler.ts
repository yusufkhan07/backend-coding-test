import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FirebaseAuthUserCreatedEvent } from '../../cqrs';

import { User } from '../entities/user.entity';

@EventsHandler(FirebaseAuthUserCreatedEvent)
export class FirebaseAuthUserCreatedEventHandler
  implements IEventHandler<FirebaseAuthUserCreatedEvent> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async handle(event: FirebaseAuthUserCreatedEvent) {
    try {
      await this.usersRepository.save({
        ...event,
      });
    } catch (err) {
      // Instead of logging, we can also fire another event to rollback changes
      console.log('FirebaseAuthUserCreatedEventHandler -> err', err);
    }
  }
}
