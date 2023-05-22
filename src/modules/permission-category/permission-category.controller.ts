import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionCategoryService } from './permission-category.service';
import { CreatePermissionCategoryDto } from './dto/create-permission-category.dto';
import { UpdatePermissionCategoryDto } from './dto/update-permission-category.dto';
import { FilterCustomDto } from './dto/filter-custom.dto';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PermissionCategory } from './entities/permission-category.entity';

@Controller('permission-category')
@ApiTags('PermissionCategory')
@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal server error' })
export class PermissionCategoryController {
    constructor(private readonly permissionCategoryService: PermissionCategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new permission category' })
    @ApiResponse({ status: 201, description: 'Permission category created successfully', type: PermissionCategory })
    create(@Body() createPermissionCategoryDto: CreatePermissionCategoryDto) {
        return this.permissionCategoryService.create(createPermissionCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all permission categories' })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'name', type: String, required: false })
    @ApiResponse({ status: 200, description: 'Get all permission categories successfully', type: [PermissionCategory] })
    findAll(@Query() filterCustomDto: FilterCustomDto) {
        return this.permissionCategoryService.findAll(filterCustomDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a permission category by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Get permission category by ID successfully', type: PermissionCategory })
    @ApiResponse({ status: 404, description: 'Permission category not found' })
    findOne(@Param('id') id: string) {
        return this.permissionCategoryService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a permission category by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Permission category updated successfully', type: PermissionCategory })
    @ApiResponse({ status: 404, description: 'Permission category not found' })
    update(@Param('id') id: string, @Body() updatePermissionCategoryDto: UpdatePermissionCategoryDto) {
        return this.permissionCategoryService.update(+id, updatePermissionCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a permission category by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 204, description: 'Permission category deleted successfully' })
    @ApiResponse({ status: 404, description: 'Permission category not found' })
    remove(@Param('id') id: string) {
        return this.permissionCategoryService.remove(+id);
    }
}
