import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productProviders } from './products.providers';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productProviders],
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
