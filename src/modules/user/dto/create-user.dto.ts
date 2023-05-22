import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'Name of the user',
        name: 'name',
        example: 'John Doe',
        required: true,
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'Email of the user',
        name: 'email',
        example: '5QRKG@example.com',
    })
    @IsEmail({}, { message: 'Invalid email' })
    @Matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
        message: 'Invalid email',
    })
    email: string;

    @ApiProperty({
        type: String,
        description: 'Password of the user',
        name: 'password',
        example: '123456',
        required: true,
    })
    @IsString({
        message: 'Invalid password',
    })
    @MinLength(6, {
        message: 'Password must be at least 6 characters',
    })
    password: string;
}
