import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePermissionDto {
    @ApiProperty({ example: 'name', description: 'Name' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3)
    name: string;

    @ApiProperty({
        name: 'permissionCategoryId',
        description: 'Id permission category',
        example: 1,
        type: Number,
    })
    @IsPositive({ message: 'Id permission category must be a positive number' })
    @Type(() => Number)
    permissionCategoryId: number;

    @ApiProperty({ example: 'description', description: 'Description' })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;
}
