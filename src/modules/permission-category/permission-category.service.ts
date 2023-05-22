import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionCategoryDto } from './dto/create-permission-category.dto';
import { UpdatePermissionCategoryDto } from './dto/update-permission-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PermissionCategory } from './entities/permission-category.entity';
import { StringProvider } from '../../providers/string-provider/string-provider';
import { FilterCustomDto } from './dto/filter-custom.dto';

@Injectable()
export class PermissionCategoryService {
    constructor(
        @InjectRepository(PermissionCategory)
        private readonly permissionCategoryRepository: Repository<PermissionCategory>,
        private readonly entityManager: EntityManager,
        private readonly stringProvider: StringProvider,
    ) {}

    async findByName(name: string): Promise<PermissionCategory> {
        return this.permissionCategoryRepository.findOne({ where: { name } });
    }

    async create(createPermissionCategoryDto: CreatePermissionCategoryDto): Promise<PermissionCategory | string> {
        const { name, description } = createPermissionCategoryDto;

        const trimmedName = name.trim();
        const exitsPermissionCategory = await this.findByName(trimmedName);
        if (exitsPermissionCategory) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    message: 'Permission category already exists',
                },
                HttpStatus.CONFLICT,
            );
        }

        const value = this.stringProvider.removeVietnameseAccents(trimmedName);
        const categoryDescription = description || `Is Category Permission for permission ${trimmedName}`;

        const permissionCategory: PermissionCategory = this.permissionCategoryRepository.create({
            name: trimmedName,
            description: categoryDescription,
            value,
        });

        try {
            return this.entityManager.transaction(async (manager) => {
                return await manager.save(permissionCategory);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(filterCustomDto: FilterCustomDto): Promise<PermissionCategory[]> {
        const { limit = 10, page = 1, name } = filterCustomDto;

        const query = this.permissionCategoryRepository.createQueryBuilder(
            this.permissionCategoryRepository.metadata.tableName,
        );

        if (name) {
            query.andWhere('permissionCategory.name LIKE :name', { name: `%${name}%` });
        }

        if (limit && page) {
            query.skip((page - 1) * limit).take(limit);
        }

        return query.getMany();
    }

    async findOne(id: number): Promise<PermissionCategory> {
        return this.permissionCategoryRepository.findOne({ where: { id } });
    }

    async update(id: number, updatePermissionCategoryDto: UpdatePermissionCategoryDto) {
        const exitsPermissionCategory = await this.findOne(id);
        if (!exitsPermissionCategory) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Permission category not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        if (updatePermissionCategoryDto.name && updatePermissionCategoryDto.name !== exitsPermissionCategory.name) {
            const trimmedName = (updatePermissionCategoryDto.name = updatePermissionCategoryDto.name.trim());
            const exitsPermissionCategoryName = await this.findByName(trimmedName);
            if (exitsPermissionCategoryName) {
                throw new HttpException(
                    {
                        status: HttpStatus.CONFLICT,
                        message: 'Permission category already exists',
                    },
                    HttpStatus.CONFLICT,
                );
            }
        }

        try {
            return this.entityManager.transaction(async (manager) => {
                Object.assign(exitsPermissionCategory, updatePermissionCategoryDto);
                return await manager.save(exitsPermissionCategory);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number): Promise<PermissionCategory> {
        const exitsPermissionCategory = await this.findOne(id);
        if (!exitsPermissionCategory) {
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
                return await manager.remove(exitsPermissionCategory);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkExistPermissionCategory(id: number): Promise<boolean> {
        const exitsPermissionCategory = await this.findOne(id);
        return !!exitsPermissionCategory;
    }
}
