import { Module, DynamicModule } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { orderProviders } from './stripe.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from 'src/products/products.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        ProductsModule,
        CartModule,
      ],
      providers: [
        StripeService,
        {
          provide:
            'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
          useFactory: async (configService: ConfigService) =>
            configService.get(
              'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
            ),
          inject: [ConfigService],
        },
        ...orderProviders,
      ],
    };
  }
}
