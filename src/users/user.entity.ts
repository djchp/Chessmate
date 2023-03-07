import { Exclude } from 'class-transformer';
import { Meet } from 'src/meet/meet.entity';
import { Profile } from 'src/profile/profile.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  @Exclude()
  password: string;

  @Column()
  username: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @ManyToMany(() => Meet, (meet) => meet.users)
  meets: Meet[]

}
