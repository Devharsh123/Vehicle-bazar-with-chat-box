import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Product } from './interface/product.interface';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    private usersService: UsersService,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async createWithImage(
    id: string,
    createProductDto: CreateProductDto,
    imageUrl: string,
  ) {
    const isUserVendor = await this.usersService.findById(id);
    if (isUserVendor.role != 'VENDOR') {
      throw new NotFoundException('User Is Not a Vendor');
    }

    const response = new this.productModel({
      u_id: new mongoose.Types.ObjectId(id),
      ...createProductDto,
      imageUrl,
    });
    await response.save();
    return { message: 'product created succesfully' };
  }

  async create(id: string, createProductDto: CreateProductDto) {
    const isUserVendor = await this.usersService.findById(id);
    if (isUserVendor.role != 'VENDOR') {
      throw new NotFoundException('User Is Not a Vendor');
    }

    const response = new this.productModel({
      u_id: new mongoose.Types.ObjectId(id),
      ...createProductDto,
    });
    await response.save();
    return { message: 'product created succesfully' };
  }

  async findVendorPr(
    userId: string,
    search?: string,
    page?: number,
    pageSize?: number,
    sort?: 'TORENT' | 'TOBUY',
  ) {
    // const query = this.productModel.find({ u_id: userId });
    const query = search
      ? { name: { $regex: search, $options: 'i' }, u_id: userId }
      : { u_id: userId };
    const sortOption =
      sort === 'TOBUY'
        ? { transactionType: 'TOBUY' }
        : { transactionType: 'TORENT' };

    const products = await this.productModel
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const total = await this.productModel.countDocuments(query);

    return { total, products };
  }

  async findAll(
    search?: string,
    page?: number,
    pageSize?: number,
    filter?: 'TORENT' | 'TOBUY',
  ): Promise<{ total: number; products: Product[] }> {
    const pipeline: any = { isVacant: true };
    // if (search) {
    //   pipeline.name = { $regex: search, $options: 'i' };
    // }

    if (filter) {
      pipeline.transactionType = filter;
    }

    const products = await this.productModel
      .find(pipeline)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const total = await this.productModel.countDocuments(pipeline);

    return { total, products };
  }

  async verifyVehicle(
    adminId: string,
    vehicleId: string,
  ): Promise<{ isVerified: boolean }> {
    // try {
    const isAdmin = await this.usersService.findById(adminId);
    if (isAdmin && isAdmin.role !== 'ADMIN') {
      throw new NotFoundException('User Is Not an ADMIN');
    }
    const vehicle = await this.productModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('No Vehicle is present with this id');
    }

    const res = await this.productModel.findOneAndUpdate(
      { _id: vehicleId },
      { $set: { isVerified: !vehicle.isVerified } }, // Toggle the value
      { new: true },
    );

    if (!res) {
      return { isVerified: false };
    }
    // console.log(res);
    return { isVerified: res.isVerified };
  }

  async updateVehicle(
    vendorId: string,
    vehicleId: string,
    updateProductDto?: UpdateProductDto,
  ): Promise<{ message: string }> {
    // try {
    const isVendor = await this.usersService.findById(vendorId);
    if (isVendor && isVendor.role !== 'VENDOR') {
      throw new NotFoundException('User Is Not an VENDOR');
    }

    const res = await this.productModel.findOneAndUpdate(
      { _id: vehicleId },
      { updateProductDto },
      { new: true },
    );
    // console.log(res, 'res');

    if (res) {
      return { message: `Vehicle updated successfully` };
    } else {
      return { message: `Vehicle update error` };
    }
    // } catch (error: any) {
    //   throw new BadRequestException('Unknown error', error);
    // }
  }

  async deleteVehicle() {}

  async findOne(id: string) {
    return await this.productModel.findById(new mongoose.Types.ObjectId(id));
  }

  async findByIdAndUpdateVacancy(id: string) {
    return await this.productModel.findByIdAndUpdate(id, { isVacant: false });
  }
}