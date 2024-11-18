// // Unit tests for: create

// import { NotFoundException } from '@nestjs/common';

// import { Product } from '../interface/product.interface';

// import { CreateProductDto } from '../dto/create-product.dto';

// import { ProductsService } from '../products.service';

// // Mock UsersService
// class MockUsersService {
//   findById = jest.fn();
// }

// // Mock Model
// interface MockModel<T> {
//   new (data: any): T;
//   save: jest.Mock;
// }

// describe('ProductsService.create() create method', () => {
//   let productsService: ProductsService;
//   let mockUsersService: MockUsersService;
//   let mockProductModel: MockModel<Product>;

//   beforeEach(() => {
//     mockUsersService = new MockUsersService() as any;
//     mockProductModel = jest.fn().mockImplementation(() => ({
//       save: jest.fn().mockResolvedValue({}),
//     })) as any;

//     productsService = new ProductsService(
//       mockUsersService as any,
//       mockProductModel as any,
//     );
//   });

//   describe('Happy Path', () => {
//     it('should create a product successfully when user is an intern', async () => {
//       // Arrange
//       const userId = 'user123';
//       const createProductDto: CreateProductDto = {
//         name: 'Product A',
//         price: 100,
//         qty: 10,
//       };
//       mockUsersService.findById.mockResolvedValue({ role: 'INTERN' } as any);

//       // Act
//       const result = await productsService.create(userId, createProductDto);

//       // Assert
//       expect(mockUsersService.findById).toHaveBeenCalledWith(userId);
//       expect(mockProductModel).toHaveBeenCalledWith({
//         u_id: userId,
//         name: createProductDto.name,
//         price: createProductDto.price,
//         qty: createProductDto.qty,
//       });
//       expect(result).toEqual({ message: 'product created succesfully' });
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should throw NotFoundException when user is not an intern', async () => {
//       // Arrange
//       const userId = 'user123';
//       const createProductDto: CreateProductDto = {
//         name: 'Product A',
//         price: 100,
//         qty: 10,
//       };
//       mockUsersService.findById.mockResolvedValue({ role: 'ADMIN' } as any);

//       // Act & Assert
//       await expect(
//         productsService.create(userId, createProductDto),
//       ).rejects.toThrow(NotFoundException);
//       expect(mockUsersService.findById).toHaveBeenCalledWith(userId);
//     });

//     it('should handle save errors gracefully', async () => {
//       // Arrange
//       const userId = 'user123';
//       const createProductDto: CreateProductDto = {
//         name: 'Product A',
//         price: 100,
//         qty: 10,
//       };
//       mockUsersService.findById.mockResolvedValue({ role: 'INTERN' } as any);
//       mockProductModel.prototype.save.mockRejectedValue(
//         new Error('Save error'),
//       );

//       // Act & Assert
//       await expect(
//         productsService.create(userId, createProductDto),
//       ).rejects.toThrow(Error);
//       expect(mockUsersService.findById).toHaveBeenCalledWith(userId);
//     });
//   });
// });

// // End of unit tests for: create
