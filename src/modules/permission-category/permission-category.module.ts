import { Module } from '@nestjs/common';
import { PermissionCategoryService } from './permission-category.service';
import { PermissionCategoryController } from './permission-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionCategory } from './entities/permission-category.entity';
import { StringProvider } from '../../providers/string-provider/string-provider';

@Module({
    imports: [TypeOrmModule.forFeature([PermissionCategory])],
    controllers: [PermissionCategoryController],
    providers: [PermissionCategoryService, StringProvider],
    exports: [PermissionCategoryService],
})
export class PermissionCategoryModule {}
