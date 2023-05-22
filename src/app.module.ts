import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BcryptProvider } from './providers/bycrypt/bcrypt-provider.service';
import { PassportModule } from '@nestjs/passport';
import { PermissionCategoryModule } from './modules/permission-category/permission-category.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        UserModule,
        RoleModule,
        PermissionModule,
        AuthModule,
        DatabaseModule,
        PermissionCategoryModule,
    ],
    controllers: [AppController],
    providers: [AppService, BcryptProvider],
})
export class AppModule {}
