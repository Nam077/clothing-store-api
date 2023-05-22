import { IsEmail, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FilterCustomDto {
    @ApiProperty({
        required: false,
        name: 'limit',
        type: Number,
        description: 'Limit of the result',
        default: 10,
    })
    @IsOptional({ message: 'Limit must be a number' })
    @IsPositive({ message: 'Limit must be a positive number' })
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        required: false,
        name: 'page',
        type: Number,
        description: 'Page of the result',
        example: 1,
    })
    @IsOptional({ message: 'Page must be a number' })
    @IsPositive({ message: 'Page must be a positive number' })
    @Type(() => Number)
    page?: number;

    @ApiProperty({
        required: false,
        name: 'name',
        type: String,
        description: 'Name of the user',
        example: 'John Doe',
    })
    @IsOptional()
    @IsString({ message: 'Invalid name' })
    name?: string;

    @ApiProperty({
        required: false,
        name: 'email',
        type: String,
        description: 'Email of the user',
        example: '5QRKG@example.com',
    })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email' })
    email?: string;
}
