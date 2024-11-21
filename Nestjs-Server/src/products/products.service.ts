import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    page: number,
    pageSize: number,
    search?: string,
    filter?: 'TORENT' | 'TOBUY',
  ): Promise<{ total: number; products: Product[] }> {
    const pipeline: any = { u_id: userId };
    if (search) {
      pipeline.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }
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

  async findAll(
    page: number,
    pageSize: number,
    search?: string,
    filter?: 'TORENT' | 'TOBUY',
  ): Promise<{ total: number; products: Product[] }> {
    const pipeline: any = { isVacant: true };
    if (search) {
      pipeline.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

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
    const isVendor = await this.usersService.findById(vendorId);
    if (isVendor && isVendor.role !== 'VENDOR') {
      throw new NotFoundException('User Is Not an VENDOR');
    }

    const res = await this.productModel.findOneAndUpdate(
      { _id: vehicleId },
      { updateProductDto },
      { new: true },
    );

    if (res) {
      return { message: `Vehicle updated successfully` };
    } else {
      return { message: `Vehicle update error` };
    }
  }

  async deleteVehicle() {}

  async findOne(id: string) {
    return await this.productModel.findById(new mongoose.Types.ObjectId(id));
  }

  async isProductCreatedByUser(u_id: string, p_id: string) {
    const resp = await this.productModel.find({
      u_id: new mongoose.Types.ObjectId(u_id),
      _id: new mongoose.Types.ObjectId(p_id),
    });

    return resp.length > 0;
  }

  async findByIdAndUpdateVacancy(id: string) {
    return await this.productModel.findByIdAndUpdate(id, { isVacant: false });
  }
}
