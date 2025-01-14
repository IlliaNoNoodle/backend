import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UsersDto } from '@app/modules/users';
import { Expose } from 'class-transformer';

export class AuthResponse extends UsersDto {
  @ApiPropertyOptional({
    example:
      'aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwZWQ4NTM1LTQxZjMtNDEyMy05MWM1LTQ5OWY1MzE3M2QyMCIsImVtYWlsIjoic2VyZ2l5ZGV2bWFzdGVyQGdtYWlsLmNvbSIsImlhdCI6MTcyNDQxNjAyMiwiZXhwIjoxNzI0NDM3NjIyfQ.mpLrrAjlymqIeALIjDIK3BVt3qCk4VE68hFS5u3v8gU',
  })
  @IsString()
  @IsOptional()
  @Expose()
  access_token?: string;
}
