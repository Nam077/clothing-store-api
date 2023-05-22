import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { FilterCustomDto } from './dto/filter-custom.dto';
import { BcryptProvider } from '../../providers/bycrypt/bcrypt-provider.service';
import { LoginDto } from '../auth/dto/login.dto';
import { RoleService } from '../role/role.service';
import { JwtPayload } from '../auth/strategies/jwt.strategy';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private entityManager: EntityManager,
        private readonly bcryptProvider: BcryptProvider,
    ) {}

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser: User = await this.findOneByEmail(createUserDto.email);
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        createUserDto.password = await this.bcryptProvider.hash(createUserDto.password);
        const user = this.userRepository.create(createUserDto);
        try {
            return this.entityManager.transaction(async (manager) => {
                return await manager.save(user);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(filterCustomDto: FilterCustomDto): Promise<any> {
        const { limit = 10, page = 1, name, email } = filterCustomDto;
        const query = this.userRepository.createQueryBuilder(this.userRepository.metadata.tableName);
        if (name) {
            query.andWhere('name LIKE :name', { name: `%${name}%` });
        }
        if (email) {
            query.andWhere('email LIKE :email', { email: `%${email}%` });
        }
        if (limit && page) {
            query.limit(limit).offset((page - 1) * limit);
        }
        return query.getMany();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (existingUser.email !== updateUserDto.email) {
            const existingUserByEmail = await this.findOneByEmail(updateUserDto.email);
            if (existingUserByEmail) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await this.bcryptProvider.hash(updateUserDto.password);
        }
        try {
            return this.entityManager.transaction(async (manager) => {
                return await manager.save(this.userRepository.create(updateUserDto));
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        try {
            return this.entityManager.transaction(async (manager) => {
                return await manager.remove(existingUser);
            });
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginDto: LoginDto): Promise<User | null> {
        const user = await this.findOneByEmail(loginDto.email);
        if (!user) {
            return null;
        }
        if (await this.bcryptProvider.compare(loginDto.password, user.password)) {
            return user;
        }
    }

    async getAllPermissions(id: number): Promise<string[]> {
        const user = await this.userRepository.findOne({ where: { id }, relations: { roles: { permissions: true } } });
        const permissions: Set<string> = new Set();
        user.roles.forEach((role) => {
            role.permissions.forEach((permission) => {
                permissions.add(permission.name);
            });
        });
        return Array.from(permissions);
    }

    async validateUser(payload: JwtPayload): Promise<any | null> {
        const user = await this.userRepository.findOne({
            where: { email: payload.email },
            relations: { roles: { permissions: true } },
        });
        if (user) {
            const setPermissions: Set<string> = new Set();
            user.roles.forEach((role) => {
                role.permissions.forEach((permission) => {
                    setPermissions.add(permission.name);
                });
            });
            return { ...user, permissions: Array.from(setPermissions) };
        }
        return null;
    }
}
