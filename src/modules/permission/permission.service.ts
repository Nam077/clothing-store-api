import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { StringProvider } from '../../providers/string-provider/string-provider';
import { FilterCustomDto } from './dto/filter-custom.dto';
import { PermissionCategoryService } from '../permission-category/permission-category.service';
import { PermissionCategory } from '../permission-category/entities/permission-category.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        private readonly permissionCategoryService: PermissionCategoryService,
        private readonly stringProvider: StringProvider,
        private readonly entityManager: EntityManager,
    ) {}

    async findByName(name: string): Promise<Permission> {
        return this.permissionRepository.findOne({ where: { name } });
    }
    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const { name, description, permissionCategoryId } = createPermissionDto;
        const exitsPermission = await this.findByName(name);
        if (exitsPermission) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    message: 'Permission already exists',
                },
                HttpStatus.CONFLICT,
            );
        }
        const permissionCategory: PermissionCategory = await this.permissionCategoryService.findOne(
            permissionCategoryId,
        );
        if (!permissionCategory) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Permission category not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        const value = this.stringProvider.removeVietnameseAccents(name);
        const permission: Permission = this.permissionRepository.create({
            name,
            description,
            value,
            permissionCategory,
        });
        try {
            return this.entityManager.transaction(async (manager) => {
                return await manager.save(permission);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(filterCustomDto: FilterCustomDto): Promise<Permission[]> {
        const { limit = 10, page = 1, name } = filterCustomDto;
        const query: SelectQueryBuilder<Permission> = this.permissionRepository.createQueryBuilder(
            this.permissionRepository.metadata.tableName,
        );
        if (name) {
            query.where('name like :name', { name: `%${name}%` });
        }
        if (limit && page) {
            query.take(limit).skip(limit * (page - 1));
        }
        return query.getMany();
    }

    async findOne(id: number): Promise<Permission> {
        return this.permissionRepository.findOne({ where: { id } });
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        const exitPermission: Permission = await this.findOne(id);
        if (!exitPermission) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Permission not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        if (updatePermissionDto.name && updatePermissionDto.name !== exitPermission.name) {
            const trimmedName = updatePermissionDto.name.trim();
            const exitsPermission = await this.findByName(trimmedName);
            if (exitsPermission) {
                throw new HttpException(
                    {
                        status: HttpStatus.CONFLICT,
                        message: 'Permission already exists',
                    },
                    HttpStatus.CONFLICT,
                );
            }
            updatePermissionDto.name = trimmedName;
            exitPermission.value = this.stringProvider.removeVietnameseAccents(trimmedName);
        }
        const permissionCategory: PermissionCategory = await this.permissionCategoryService.findOne(
            updatePermissionDto.permissionCategoryId,
        );
        if (!permissionCategory) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Permission category not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        try {
            return this.entityManager.transaction(async (manager) => {
                Object.assign(exitPermission, updatePermissionDto);
                return await manager.save(exitPermission);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        const exitPermission: Permission = await this.findOne(id);
        if (!exitPermission) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Permission not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        try {
            return this.entityManager.transaction(async (manager) => {
                return await manager.delete(Permission, id);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
