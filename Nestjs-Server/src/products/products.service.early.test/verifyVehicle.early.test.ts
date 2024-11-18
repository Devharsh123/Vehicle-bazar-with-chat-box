// // Unit tests for: verifyVehicle

// import { NotFoundException } from '@nestjs/common';

// import { Product } from '../interface/product.interface';

// import { ProductsService } from '../products.service';

// // Mock UsersService
// class MockUsersService {
//   findById = jest.fn();
// }

// // Mock Model
// interface MockModel {
//   findById: jest.Mock;
//   findOneAndUpdate: jest.Mock;
// }

// describe('ProductsService.verifyVehicle() verifyVehicle method', () => {
//   let productsService: ProductsService;
//   let mockUsersService: MockUsersService;
//   let mockProductModel: MockModel<Product>;

//   beforeEach(() => {
//     mockUsersService = new MockUsersService() as any;
//     mockProductModel = {
//       findById: jest.fn(),
//       findOneAndUpdate: jest.fn(),
//     } as any;

//     productsService = new ProductsService(
//       mockUsersService as any,
//       mockProductModel as any,
//     );
//   });

//   describe('Happy Path', () => {
//     it('should verify the vehicle successfully when admin and vehicle exist', async () => {
//       // Arrange
//       const adminId = 'admin123';
//       const vehicleId = 'vehicle123';
//       const vehicle = { _id: vehicleId, isVerified: false };

//       mockUsersService.findById.mockResolvedValue({ role: 'ADMIN' } as any);
//       mockProductModel.findById.mockResolvedValue(vehicle as any);
//       mockProductModel.findOneAndUpdate.mockResolvedValue({
//         isVerified: true,
//       } as any);

//       // Act
//       const result = await productsService.verifyVehicle(adminId, vehicleId);

//       // Assert
//       expect(result).toEqual({ isVerified: true });
//       expect(mockUsersService.findById).toHaveBeenCalledWith(adminId);
//       expect(mockProductModel.findById).toHaveBeenCalledWith(vehicleId);
//       expect(mockProductModel.findOneAndUpdate).toHaveBeenCalledWith(
//         { _id: vehicleId },
//         { $set: { isVerified: true } },
//         { new: true },
//       );
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should throw NotFoundException if user is not an admin', async () => {
//       // Arrange
//       const adminId = 'user123';
//       const vehicleId = 'vehicle123';

//       mockUsersService.findById.mockResolvedValue({ role: 'USER' } as any);

//       // Act & Assert
//       await expect(
//         productsService.verifyVehicle(adminId, vehicleId),
//       ).rejects.toThrow(NotFoundException);
//       expect(mockUsersService.findById).toHaveBeenCalledWith(adminId);
//       expect(mockProductModel.findById).not.toHaveBeenCalled();
//     });

//     it('should throw NotFoundException if vehicle does not exist', async () => {
//       // Arrange
//       const adminId = 'admin123';
//       const vehicleId = 'vehicle123';

//       mockUsersService.findById.mockResolvedValue({ role: 'ADMIN' } as any);
//       mockProductModel.findById.mockResolvedValue(null);

//       // Act & Assert
//       await expect(
//         productsService.verifyVehicle(adminId, vehicleId),
//       ).rejects.toThrow(NotFoundException);
//       expect(mockUsersService.findById).toHaveBeenCalledWith(adminId);
//       expect(mockProductModel.findById).toHaveBeenCalledWith(vehicleId);
//     });

//     it('should return isVerified as false if update fails', async () => {
//       // Arrange
//       const adminId = 'admin123';
//       const vehicleId = 'vehicle123';
//       const vehicle = { _id: vehicleId, isVerified: false };

//       mockUsersService.findById.mockResolvedValue({ role: 'ADMIN' } as any);
//       mockProductModel.findById.mockResolvedValue(vehicle as any);
//       mockProductModel.findOneAndUpdate.mockResolvedValue(null);

//       // Act
//       const result = await productsService.verifyVehicle(adminId, vehicleId);

//       // Assert
//       expect(result).toEqual({ isVerified: false });
//       expect(mockUsersService.findById).toHaveBeenCalledWith(adminId);
//       expect(mockProductModel.findById).toHaveBeenCalledWith(vehicleId);
//       expect(mockProductModel.findOneAndUpdate).toHaveBeenCalledWith(
//         { _id: vehicleId },
//         { $set: { isVerified: true } },
//         { new: true },
//       );
//     });
//   });
// });

// // End of unit tests for: verifyVehicle
