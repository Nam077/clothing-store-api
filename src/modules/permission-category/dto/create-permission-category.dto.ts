import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsOptional } from 'class-validator';
export class CreatePermissionCategoryDto {
    // name,description
    @ApiProperty({ example: 'name', description: 'Name' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 'description', description: 'Description' })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;
}
