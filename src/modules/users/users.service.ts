import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoggerServiceDecorator } from '@app/common';
import { UsersRepository } from '@repositoryModule';
import { UsersResponse } from './dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  @LoggerServiceDecorator()
  async findAll(): Promise<UsersResponse[]> {
    try {
      const existsUsers = await this.userRepository.findAll()

      if (!existsUsers) {
        throw new BadRequestException('Users not found');
      }

      return existsUsers;

    } catch (error) {
      throw error;
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<UsersResponse> {
    try {
      const existsUser = await this.userRepository.findOne({ _id: id });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      return existsUser;
    } catch (error) {
      throw error;

    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<void> {
    try {
      const existsUser = await this.userRepository.findOne({ _id: id });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      await this.userRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
