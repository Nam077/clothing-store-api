import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity({
    name: 'roles',
})
export class Role {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        comment: 'Id of the role',
        unsigned: true,
    })
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        comment: 'Name of the role',
    })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    permissions: Permission[];
}
