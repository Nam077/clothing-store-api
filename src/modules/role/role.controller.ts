import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@Controller('role')
@ApiTags('Role')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal server error' })
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'Role created successfully', type: Role })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'Get all roles successfully', type: [Role] })
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a role by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Get role by ID successfully', type: Role })
    @ApiResponse({ status: 404, description: 'Role not found' })
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a role by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Role updated successfully', type: Role })
    @ApiResponse({ status: 404, description: 'Role not found' })
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a role by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 204, description: 'Role deleted successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    remove(@Param('id') id: string) {
        return this.roleService.remove(+id);
    }
}
