// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsController } from './products.controller';
// import { ProductsService } from './products.service';
// import { AuthGaurd } from 'src/auth/auth.gaurd';
// import { ExecutionContext } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UsersService } from 'src/users/users.service';

// describe('ProductsController', () => {
//   let controller: ProductsController;
//   let service: ProductsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProductsController],
//       providers: [
//         {
//           provide: ProductsService,
//           useValue: {
//             create: jest.fn()
//           }
//         }
//       ]
//     })
//     .overrideGuard(AuthGaurd)
//     .useValue({
//       canActivate: jest.fn((context: ExecutionContext) => true),
//     })
//     .compile();

//     controller = module.get<ProductsController>(ProductsController);
//     service = module.get<ProductsService>(ProductsService);

//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('create', () => {
//     it('should call ProductsService.create with the correct parameters', async () => {
//       const req = { user: { name: 'John Doe' } };
//       const createProductDto: CreateProductDto = { name: 'Test Product', price: 100, qty: 1 };
//       const result = { message: 'something' };

//       jest.spyOn(service, 'create').mockResolvedValue(result);

//       expect(await controller.create(req, createProductDto)).toBe(result);
//       expect(service.create).toHaveBeenCalledWith(req.user.name, createProductDto);
//     });
//   });
// });
