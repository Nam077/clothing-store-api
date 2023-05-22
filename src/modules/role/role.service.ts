import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}
    async create(createRoleDto: CreateRoleDto) {
        return 'This action adds a new role';
    }

    async findAll() {
        return `This action returns all role`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    async remove(id: number) {
        return `This action removes a #${id} role`;
    }

    async findRoleByIds(ids: number[]): Promise<Role[]> {
        return await this.roleRepository.find({
            where: {
                id: In(ids),
            },
        });
    }
}
