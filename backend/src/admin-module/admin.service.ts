import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async create({ password, ...userDetails }: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new this.adminModel({
      ...userDetails,
      password: hashedPassword,
    });

    await admin.save();

    return { statusCode: 201, message: 'Administrador criado com sucesso.' };
  }

  async findAll() {
    return this.adminModel.find().exec();
  }

  async findOneById(id: string) {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }

  async validateAdmin(email: string, password: string) {
    const findUser = await this.adminModel
      .findOne({ email: email })
      .select('+password')
      .exec();

    if (!findUser) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const valid = await bcrypt.compare(password, findUser.password);

    if (!valid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
    };
  }
}
