import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
@Entity({
    name: 'permissions',
})
export class Permission {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        comment: 'Id of the permission',
        unsigned: true,
    })
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        comment: 'Name of the permission',
    })
    name: string;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 255,
        comment: 'Description of the permission',
    })
    description: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];
}
