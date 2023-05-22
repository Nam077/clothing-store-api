import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const user = await this.userService.login(loginDto);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.generateToken(user);
    }

    async getAllPermissions(id: number): Promise<string[]> {
        return await this.userService.getAllPermissions(id);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.validateUser(payload);
    }

    async generateToken(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        return {
            accessToken: await this.generateAccessToken(user),
            refreshToken: await this.generateRefreshToken(user),
        };
    }

    async generateRefreshToken(user: User): Promise<string> {
        return await this.jwtService.signAsync(
            { id: user.id, email: user.email },
            { expiresIn: '7d', secret: process.env.JWT_SECRET },
        );
    }

    async generateAccessToken(user: User): Promise<string> {
        return await this.jwtService.signAsync(
            { id: user.id, email: user.email },
            { expiresIn: '1h', secret: process.env.JWT_SECRET },
        );
    }
}
