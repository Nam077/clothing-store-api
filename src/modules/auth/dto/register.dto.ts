import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { Match } from '../../../decorators/validates/custom.validate';

export class RegisterDto {
    @ApiProperty({ example: 'John Doe', description: 'Name' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @ApiProperty({ example: '5QRKG@example.com', description: 'Email address' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    @Matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
        message: 'Email must be a valid email',
    })
    email: string;

    @ApiProperty({ example: '123456', description: 'Password (min length: 6)' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty({ example: '123456', description: 'Confirm password (min length: 6)' })
    @IsString({ message: 'Confirm password must be a string' })
    @MinLength(6, { message: 'Confirm password must be at least 6 characters long' })
    @Match('password', { message: 'Passwords must match' })
    confirmPassword: string;
}
