import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptProvider } from '../../providers/bycrypt/bcrypt-provider.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, BcryptProvider],
    exports: [UserService, BcryptProvider],
})
export class UserModule {}
