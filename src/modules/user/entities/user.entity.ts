import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity({
    name: 'users',
})
@Index('email', ['email'], { unique: true })
export class User {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        comment: 'Id of the user',
        unsigned: true,
    })
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        comment: 'Name of the user',
    })
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        unique: true,
        comment: 'Email of the user',
    })
    email: string;

    @Column({
        name: 'password',
        type: 'text',
        comment: 'Password of the user',
    })
    password: string;

    @Column({
        name: 'refresh_token',
        type: 'text',
        comment: 'Refresh token of the user',
        nullable: true,
    })
    refresh_token: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        comment: 'Created at of the user',
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        comment: 'Updated at of the user',
    })
    updated_at: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];
}
