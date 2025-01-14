import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoggerServiceDecorator } from '@app/common';
import { UsersRepository } from '@repositoryModule';
import { UsersDocument } from '@app/models';
import { AuthResponse, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  @LoggerServiceDecorator()
  async loginUser(data: LoginDto): Promise<AuthResponse> {
    try {
      const existsUser = await this.usersRepository.findOne({ email: data.email }) as UsersDocument;

      if (!existsUser) {
        throw new NotFoundException('User not found');
      }

      const isPasswordCorrect = await bcrypt.compare(data.password, existsUser.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('Password incorrect');
      }

      const payload = {
        id: existsUser._id,
        name: existsUser.name,
        email: existsUser.email,
      };

      return {
        ...existsUser,
        access_token: this.jwtService.sign(payload),
      } as AuthResponse;
    } catch (error) {
      throw error;
    }
  }

  @LoggerServiceDecorator()
  async registerUser(data: RegisterDto): Promise<AuthResponse> {
    try {
      const existsUser = (await this.usersRepository.findOne({ email: data.email })) as UsersDocument;

      if (existsUser) {
        throw new BadRequestException('User already registered');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const createdUser = await this.usersRepository.create({
        ...data,
        password: hashedPassword,
      }) as UsersDocument;

      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}
