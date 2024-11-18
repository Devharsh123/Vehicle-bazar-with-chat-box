import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  createCheckoutSession(
    @Body(ValidationPipe) createStripeDto: CreateStripeDto,
  ) {
    return this.stripeService.createCheckoutSession(createStripeDto);
  }

  @Get('after-checkout')
  afterCheckoutSession(@Query('session_id') session_id: string) {
    return this.stripeService.afterCheckoutSession(session_id);
  }

  @Get('invoice-items')
  findAll() {
    return this.stripeService.findAll();
  }

  @Get()
  findAllSessionLineItems() {
    return this.stripeService.findAllSessionLineItems(
      'cs_test_a1z7OLwVqI7SffSdROn8xhRjtcQQgBxAowZAwIqx89Vfn60i6FtCY7vQiu',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}
