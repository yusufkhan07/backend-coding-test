import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import * as admin from 'firebase-admin';

import { Blog } from './entities/blog.entity';

@EventSubscriber()
export class BlogSubscriber implements EntitySubscriberInterface<Blog> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Blog;
  }

  afterInsert(event: InsertEvent<Blog>) {
    const db = admin.firestore();

    // create a new blog
    db.collection('blogs').doc(String(event.entity.id)).set({
      id: event.entity.id,
      title: event.entity.title,
      description: event.entity.description,
    });
  }

  afterUpdate(event: UpdateEvent<Blog>) {
    const db = admin.firestore();

    // create a new blog
    db.collection('blogs')
      .doc(String(event.entity?.id || event.databaseEntity?.id))
      .update(
        {
          id: event.entity.id,
          title: event.entity.title,
          description: event.entity.description,
        },
        {},
      );
  }

  afterRemove(event: RemoveEvent<Blog>) {
    const db = admin.firestore();

    db.collection('blogs').doc(String(event.entityId)).delete();
  }
}
