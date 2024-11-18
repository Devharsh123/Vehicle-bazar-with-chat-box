import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import mongoose, { Model } from 'mongoose';
import { OrderItem } from './schema/stripe.schema';
import { ProductsService } from 'src/products/products.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,

    @Inject('ORDER_MODEL')
    private orderModel: Model<OrderItem>,

    @Inject(
      'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
    )
    private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(
      'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
      {
        apiVersion: '2024-09-30.acacia',
      },
    );
    this.logger.log(
      'StripeService initialized with API version 2024-09-30.acacia',
    );
  }

  async createCheckoutSession(createStripeDto: CreateStripeDto) {
    console.log(createStripeDto, 'create');
    const YOUR_DOMAIN = 'http://localhost:1234';

    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      customer_email: createStripeDto.shippingDetail.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: createStripeDto.orderItems.prodName,
              metadata: {
                userId: createStripeDto.orderItems.u_id,
                productId: createStripeDto.orderItems.p_id,
                noOfDays: createStripeDto.orderItems.noOfDays,
              },
            },
            unit_amount: createStripeDto.orderItems.totalPrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session;
  }
  async afterCheckoutSession(session_id: string) {
    const session = await this.stripe.checkout.sessions.retrieve(session_id);

    if (session.status === 'complete') {
      const { totalAmount, product } =
        await this.findAllSessionLineItems(session_id);

      if (totalAmount && product) {
        const response = new this.orderModel({
          u_id: new mongoose.Types.ObjectId(product.metadata.userId),
          p_id: new mongoose.Types.ObjectId(product.metadata.productId),
          prodName: product.name,
          noOfDays: product.metadata.noOfDays,
          totalAmount: totalAmount,
        });
        await response.save();
        await this.productsService.findByIdAndUpdateVacancy(
          product.metadata.productId,
        );
        await this.cartService.remove(
          product.metadata.userId,
          product.metadata.productId,
        );
      }
    }
    return {
      status: session.status,
      customer_email: session.customer_details.email,
    };
  }

  async findAllSessionLineItems(session_id: string) {
    const lineItems =
      await this.stripe.checkout.sessions.listLineItems(session_id);
    console.log(lineItems, 'lineitem');
    let main = lineItems.data[0].price.product;
    const product = await this.stripe.products.retrieve(String(main));
    return { totalAmount: lineItems.data[0].amount_total, product };
  }

  async findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
