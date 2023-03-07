import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'meets' })
export class Meet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.meets)
  users: User[];
}
