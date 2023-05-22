import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterCustomDto } from './dto/filter-custom.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { IsPublic, Permission } from '../auth/decorators/custom.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal server error' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @IsPublic()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: User })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'name', type: String, required: false })
    @ApiQuery({ name: 'email', type: String, required: false })
    @Permission('user:read')
    @ApiResponse({ status: 200, description: 'Get all users successfully', type: [User] })
    findAll(@Query() filterCustomDto: FilterCustomDto) {
        return this.userService.findAll(filterCustomDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Get user by ID successfully', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
