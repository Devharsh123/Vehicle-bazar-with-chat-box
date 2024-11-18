import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGaurd } from 'src/auth/auth.gaurd';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGaurd)
  @Post(':id')
  create(@Req() req, @Param('id') id: string) {
    return this.cartService.create(req.user.id, id);
  }

  @UseGuards(AuthGaurd)
  @Get()
  findAll(@Req() req) {
    return this.cartService.findAll(req.user.id);
  }

  @UseGuards(AuthGaurd)
  @Get('findDetails/:id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.cartService.findDetails(req.user.id, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @UseGuards(AuthGaurd)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.cartService.remove(req.user.id, id);
  }

  @UseGuards(AuthGaurd)
  @Post('toggle/:id')
  toggle(@Req() req, @Param('id') id: string) {
    return this.cartService.toggle(id, req.user.id);
  }
}
