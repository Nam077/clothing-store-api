import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IsPublic, Permission } from './decorators/custom.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsGuard } from './guards/permissions-guard.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @IsPublic()
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permission('user:read')
    me() {
        return 'me';
    }
}
