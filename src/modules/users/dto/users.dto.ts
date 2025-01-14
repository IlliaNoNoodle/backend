import { ApiProperty,  } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty,  IsString,  } from 'class-validator';

export class UsersDto {
  @ApiProperty({ example: 'Jon' })
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
}
