import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';
import { create } from 'domain';

describe('ProductsService', () => {
  let service: ProductsService;
  let usersService: UsersService;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(), // mock implementation
          },
        },
        {
          provide: 'PRODUCT_MODEL',
          useValue: {
            find: jest.fn().mockReturnValue({ exec: jest.fn() }),
            create: jest.fn(),
            save: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    usersService = module.get<UsersService>(UsersService);
    productModel = module.get<Model<Product>>('PRODUCT_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw NotFoundException if user is not an INTERN', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        qty: 1,
      };
      jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
        id: '1',
        name: 'Test User',
        email: 'abc@gmail.com',
        role: 'ADMIN',
      });

      await expect(service.create('1', createProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    // it('should create a product if user is an INTERN', async () => {
    //   const createProductDto: CreateProductDto = {
    //     name: 'Test Product',
    //     price: 100,
    //     qty: 1,
    //   };
    //   jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
    //     id: '1',
    //     name: 'Test User',
    //     email: 'abc@gmail.com',
    //     role: 'INTERN',
    //   });

    //   jest.spyOn(productModel, 'constructor').mockReturnValueOnce({
    //     save: jest.fn().mockResolvedValueOnce(undefined),
    //   });

    //   const result = await service.create('1', createProductDto);

    //   expect(result).toEqual({ message: 'product created succesfully' });
    // });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { name: 'Product 1', price: 100, qty: 1 },
        { name: 'Product 2', price: 200, qty: 1 },
      ];
      jest.spyOn(productModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockProducts),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('verifyVehicle', () => {
    it('should throw NotFoundException if user is not an ADMIN', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
        id: '1',
        name: 'Test User',
        email: 'abc@gmail.com',
        role: 'ENGINEER',
      });
      await expect(service.verifyVehicle('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw error vehicle not found', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
        id: '1',
        name: 'Test User',
        email: 'abc@gmail.com',
        role: 'ADMIN',
      });
      jest.spyOn(productModel, 'findById').mockResolvedValueOnce(null);
      await expect(service.verifyVehicle('1', '2')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should verify vehicle and update the data', async () => {
      const mockProduct = {
        _id: '1',
        u_id: '1',
        name: 'noodles',
        price: 123,
        qty: 2,
        isVerified: false,
        __v: 0,
      };
      jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
        id: '1',
        name: 'Test User',
        email: 'abc@gmail.com',
        role: 'ADMIN',
      });
      jest.spyOn(productModel, 'findById').mockResolvedValueOnce(mockProduct);
      jest.spyOn(productModel, 'findOneAndUpdate').mockResolvedValueOnce({
        _id: '1',
        u_id: '1',
        name: 'noodles',
        price: 123,
        qty: 2,
        isVerified: !mockProduct.isVerified,
        __v: 0,
      });

      expect(await service.verifyVehicle('1', '1')).toEqual({
        isVerified: true,
      });
    });
  });

  describe('udpateVehicle', () => {
    it('Not found Exception if user is not vendor', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
        id: '1',
        name: 'Test User',
        email: 'abc@gmail.com',
        role: 'ADMIN',
      });

      await expect(service.updateVehicle('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('Update vehicle succesfully, if User is VENDOR', async () => {
      const vendorId = '1';
      const productId = '1';

      const mockOldProduct = {
        name: 'noodles',
        price: 123,
        qty: 2,
      };

      const mockUpdateName = {
        name: 'maggie',
        price: null,
        qty: null,
      };

      const mockNewProduct = {
        name: 'maggie',
        price: 123,
        qty: 2,
      };
      jest.spyOn(usersService, 'findById').mockResolvedValueOnce({
        id: vendorId,
        name: 'Test User',
        email: 'abc@gmail.com',
        role: 'VENDOR',
      });

      jest
        .spyOn(productModel, 'findOneAndUpdate')
        .mockResolvedValueOnce(mockNewProduct);

      const result = await service.updateVehicle(
        vendorId,
        productId,
        mockUpdateName,
      );
      expect(result).toEqual({ message: 'Vehicle updated successfully' });
    });
  });
});
