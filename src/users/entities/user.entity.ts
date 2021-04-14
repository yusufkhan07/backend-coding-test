import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column({ unique: true, primary: true })
  uid: string;

  @Column()
  name: string;

  // max email length is 320
  @Column({ length: 320 })
  email: string;

  @Column('date')
  dateOfBirth: string;
}
