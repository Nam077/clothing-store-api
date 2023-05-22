import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { PermissionCategory } from '../../permission-category/entities/permission-category.entity';

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

    @Column({
        name: 'value',
        type: 'varchar',
        length: 255,
        comment: 'Value of the permission',
        default: '',
    })
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

    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({
        name: 'role_permissions',
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

    @ManyToOne(() => PermissionCategory, (permissionCategory) => permissionCategory.permissions)
    permissionCategory: PermissionCategory;
}
