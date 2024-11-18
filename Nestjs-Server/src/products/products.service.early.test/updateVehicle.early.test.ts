// // Unit tests for: updateVehicle

// import { NotFoundException } from '@nestjs/common';

// import { Product } from '../interface/product.interface';

// import { UpdateProductDto } from '../dto/create-product.dto';

// import { ProductsService } from '../products.service';

// // Mock UsersService
// class MockUsersService {
//   findById = jest.fn();
// }

// // Mock Model
// interface MockModel {
//   findOneAndUpdate: jest.Mock;
// }

// describe('ProductsService.updateVehicle() updateVehicle method', () => {
//   let service: ProductsService;
//   let mockUsersService: MockUsersService;
//   let mockProductModel: MockModel<Product>;

//   beforeEach(() => {
//     mockUsersService = new MockUsersService() as any;
//     mockProductModel = {
//       findOneAndUpdate: jest.fn(),
//     } as any;

//     service = new ProductsService(
//       mockUsersService as any,
//       mockProductModel as any,
//     );
//   });

//   describe('Happy Path', () => {
//     it('should update the vehicle successfully when the vendor is valid and vehicle is verified', async () => {
//       // Arrange
//       const vendorId = 'vendor123';
//       const vehicleId = 'vehicle123';
//       const updateProductDto: UpdateProductDto = {
//         name: 'Updated Vehicle',
//         price: 1000,
//         qty: 10,
//       };

//       mockUsersService.findById.mockResolvedValue({ role: 'VENDOR' } as any);
//       mockProductModel.findOneAndUpdate.mockResolvedValue({
//         isVerified: true,
//       } as any);

//       // Act
//       const result = await service.updateVehicle(
//         vendorId,
//         vehicleId,
//         updateProductDto,
//       );

//       // Assert
//       expect(result).toEqual({ message: 'Vehicle updated successfully' });
//       expect(mockUsersService.findById).toHaveBeenCalledWith(vendorId);
//       expect(mockProductModel.findOneAndUpdate).toHaveBeenCalledWith(
//         { _id: vehicleId },
//         { updateProductDto },
//         { new: true },
//       );
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should throw NotFoundException if the user is not a vendor', async () => {
//       // Arrange
//       const vendorId = 'vendor123';
//       const vehicleId = 'vehicle123';
//       const updateProductDto: UpdateProductDto = {
//         name: 'Updated Vehicle',
//         price: 1000,
//         qty: 10,
//       };

//       mockUsersService.findById.mockResolvedValue({ role: 'CUSTOMER' } as any);

//       // Act & Assert
//       await expect(
//         service.updateVehicle(vendorId, vehicleId, updateProductDto),
//       ).rejects.toThrow(NotFoundException);
//       expect(mockUsersService.findById).toHaveBeenCalledWith(vendorId);
//       expect(mockProductModel.findOneAndUpdate).not.toHaveBeenCalled();
//     });

//     it('should return a message indicating vehicle update error if vehicle is not verified', async () => {
//       // Arrange
//       const vendorId = 'vendor123';
//       const vehicleId = 'vehicle123';
//       const updateProductDto: UpdateProductDto = {
//         name: 'Updated Vehicle',
//         price: 1000,
//         qty: 10,
//       };

//       mockUsersService.findById.mockResolvedValue({ role: 'VENDOR' } as any);
//       mockProductModel.findOneAndUpdate.mockResolvedValue({
//         isVerified: false,
//       } as any);

//       // Act
//       const result = await service.updateVehicle(
//         vendorId,
//         vehicleId,
//         updateProductDto,
//       );
// //
//       // Assert
//       expect(result).toEqual({ message: 'Vehicle update error' });
//       expect(mockUsersService.findById).toHaveBeenCalledWith(vendorId);
//       expect(mockProductModel.findOneAndUpdate).toHaveBeenCalledWith(
//         { _id: vehicleId },
//         { updateProductDto },
//         { new: true },
//       );
//     });
//   });
// });

// // End of unit tests for: updateVehicle
