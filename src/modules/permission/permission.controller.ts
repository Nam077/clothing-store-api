import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FilterCustomDto } from './dto/filter-custom.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Permission } from './entities/permission.entity';

@Controller('permission')
@ApiTags('Permission')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal server error' })
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new permission' })
    @ApiResponse({ status: 201, description: 'Permission created successfully', type: Permission })
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all permissions' })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'name', type: String, required: false })
    @ApiResponse({ status: 200, description: 'Get all permissions successfully', type: [Permission] })
    findAll(@Query() filterCustomDto: FilterCustomDto) {
        return this.permissionService.findAll(filterCustomDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a permission by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Get permission by ID successfully', type: Permission })
    @ApiResponse({ status: 404, description: 'Permission not found' })
    findOne(@Param('id') id: string) {
        return this.permissionService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a permission by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Permission updated successfully', type: Permission })
    @ApiResponse({ status: 404, description: 'Permission not found' })
    update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionService.update(+id, updatePermissionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a permission by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 204, description: 'Permission deleted successfully' })
    @ApiResponse({ status: 404, description: 'Permission not found' })
    remove(@Param('id') id: string) {
        return this.permissionService.remove(+id);
    }
}
