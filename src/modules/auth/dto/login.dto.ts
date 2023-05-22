import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: '5QRKG@example.com', description: 'Email address' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    @Matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
        message: 'Email must be a valid email',
    })
    email: string;

    @ApiProperty({ example: '123456', description: 'Password (min length: 6)' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6)
    password: string;
}
