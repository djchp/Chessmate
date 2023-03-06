import { User } from "src/users/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'profiles'})
export class Profile {
    @PrimaryGeneratedColumn()
    id:number

    @Column({default: '',length: 512})
    bio?: string

    @Column({nullable: true})
    avatar?: string

    // @Column({nullable: true})
    @OneToOne(() => User,(user)=> user.profile)
    user: User

}