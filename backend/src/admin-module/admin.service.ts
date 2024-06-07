import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.schema';
import { AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    return await this.adminModel.create(createAdminDto);
  }

  async findAll() {
    return await this.adminModel.find().exec();
  }

  async findOne(id: string) {
    return `This action returns a #${id} admin`;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async remove(id: string) {
    return `This action removes a #${id} admin`;
  }
}
