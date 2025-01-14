import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Users, UsersDocument } from '@app/models';
import { CreateUserDto } from '@app/modules';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<Users> {
    const createdUser = await new this.usersModel(data).save();
    return createdUser.toObject();
  }

  async findAll(query?: FilterQuery<Users>): Promise<Users[]> {
    return this.usersModel.find(query).lean().exec();
  }

  async findOne(query: FilterQuery<Users>): Promise<Users> {
    return this.usersModel.findOne(query).lean().exec();
  }

  async remove(id: string): Promise<void> {
    await this.usersModel.findOneAndDelete({ _id: id });
  }
}
