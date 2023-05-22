import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

@Entity({
    name: 'permission_categories',
})
export class PermissionCategory {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        comment: 'Id of the permission category',
        unsigned: true,
    })
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        comment: 'Name of the permission category',
    })
    name: string;

    @Column({
        name: 'value',
        type: 'varchar',
        length: 255,
        comment: 'Value of the permission category',
        default: '',
    })
    value: string;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 255,
        comment: 'Description of the permission category',
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

    @OneToMany(() => Permission, (permission) => permission.permissionCategory)
    @JoinColumn({
        name: 'permission_id',
        referencedColumnName: 'id',
    })
    permissions: Permission[];
}
