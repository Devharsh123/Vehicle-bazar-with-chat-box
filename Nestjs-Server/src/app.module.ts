import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TodoModule } from './todo/todo.module';
import { CartModule } from './cart/cart.module';
import { StripeModule } from './stripe/stripe.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductsModule,
    TodoModule,
    CartModule,
    StripeModule.forRootAsync(),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
