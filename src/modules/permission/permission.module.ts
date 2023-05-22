import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StringProvider } from '../../providers/string-provider/string-provider';
import { PermissionCategoryModule } from '../permission-category/permission-category.module';

@Module({
    imports: [TypeOrmModule.forFeature([Permission]), PermissionCategoryModule],
    controllers: [PermissionController],
    providers: [PermissionService, StringProvider],
    exports: [PermissionService],
})
export class PermissionModule {}
