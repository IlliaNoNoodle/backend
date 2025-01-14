import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@modules/users';
import { RepositoryModule } from '@modules/repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

const providers = [AuthService, JwtStrategy];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      },
    }),
    PassportModule,
    UsersModule,
    RepositoryModule,
  ],
  providers,
  controllers: [AuthController],
  exports: providers,
})
export class AuthModule {}
