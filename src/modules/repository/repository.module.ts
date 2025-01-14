import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from 'src/modules/repository/repositories';

import { Users, UsersSchema } from '@app/models';

const providers = [ConfigService, UsersRepository];

const models = [
  { name: Users.name, schema: UsersSchema },
];
@Global()
@Module({
  imports: [MongooseModule.forFeature([...models])],
  controllers: [],
  providers,
  exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}
