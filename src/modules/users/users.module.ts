import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

const providers = [UsersService];

@Module({
  imports: [RepositoryModule],
  providers,
  controllers: [UsersController],
  exports: providers,
})
export class UsersModule {}
