import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IsPublic, Permission } from './decorators/custom.decorator';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionsGuard } from './guards/permissions-guard.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
@ApiTags('Authentication')
@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal server error' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @IsPublic()
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permission('user:read')
    @ApiOperation({ summary: 'Get current user information' })
    @ApiResponse({ status: 200, description: 'Get current user information successfully' })
    me() {
        return 'me';
    }
}
