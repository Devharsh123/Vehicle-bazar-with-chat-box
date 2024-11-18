import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartProviders } from './cart.providers';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartController],
  providers: [CartService, ...cartProviders],
  imports: [DatabaseModule, ProductsModule],
  exports: [CartService],
})
export class CartModule {}
