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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        UserModule,
        RoleModule,
        PermissionModule,
        AuthModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService, BcryptProvider],
})
export class AppModule {}
