import { Inject, Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import mongoose, { Model } from 'mongoose';
import { Cart } from './schema/cart.schema';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  constructor(
    private productsService: ProductsService,

    @Inject('CART_MODEL')
    private cartModel: Model<Cart>,
  ) {}
  async create(u_id: string, p_id: string) {
    const isProductCreatedByUser =
      await this.productsService.isProductCreatedByUser(u_id, p_id);
    if (isProductCreatedByUser) {
      return 'Vendor created this product';
    }
    const res = new this.cartModel({
      u_id: new mongoose.Types.ObjectId(u_id),
      p_id: new mongoose.Types.ObjectId(p_id),
      isAdded: true,
    });
    await res.save();
    return 'Cart item added';
  }

  async findAll(id: string) {
    const res = await this.cartModel
      .aggregate([
        {
          $match: {
            u_id: new mongoose.Types.ObjectId(id), // Match the cart by userId
          },
        },
        {
          $lookup: {
            from: 'users', // Join with the User collection
            localField: 'u_id', // User ID in Cart
            foreignField: '_id', // _id in User collection
            as: 'userDetails', // Store as userDetails
          },
        },
        {
          $lookup: {
            from: 'products', // Join with the Product collection
            localField: 'p_id', // Product ID in Cart
            foreignField: '_id', // _id in Product collection
            as: 'productDetails', // Store product details as an array
          },
        },
        {
          $unwind: '$productDetails', // Unwind only productDetails
        },
        {
          $group: {
            _id: '$u_id', // Group by userId to accumulate productDetails
            userDetail: { $first: '$userDetails' }, // Single user details
            productDetails: { $push: '$productDetails' }, // Accumulate product details
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id from the result
            userDetail: { $arrayElemAt: ['$userDetail', 0] }, // Get the first element of the user array
            productDetails: 1, // Include product details array
          },
        },
      ])
      .exec();

    return res ? res : [];
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async findDetails(id: string, cartId: string) {
    const res = await this.cartModel.findById(cartId);
    return 'id';
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(u_id: string, p_id: string) {
    const res = await this.cartModel.findOne({ u_id, p_id });
    if (res && res._id) {
      await this.cartModel.deleteOne({
        _id: res._id,
      });
    }
    return `This action removes a ${res._id} cart`;
  }

  async toggle(p_id: string, u_id: string) {
    const isAdded = await this.cartModel.findOne({ u_id, p_id });
    if (isAdded) {
      return { message: `Product already added to cart`, isAdded: true };
    } else {
      const add = new this.cartModel({ u_id, p_id, isAdded: true });
      await add.save();
      return { message: `Product added to cart`, isAdded: true };
    }
  }
}
