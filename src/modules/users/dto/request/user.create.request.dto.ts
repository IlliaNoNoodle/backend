import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ example: 'example@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Expose()
  email: string;

  @ApiPropertyOptional({ example: '12345678' })
  @MinLength(8)
  @IsString()
  @IsOptional()
  @Expose()
  password?: string;

}
