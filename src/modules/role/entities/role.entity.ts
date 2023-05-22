import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

    @Column({
        name: 'description',
        type: 'varchar',
        length: 255,
        comment: 'Description of the role',
    })
    description: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
    })
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    permissions: Permission[];
}
