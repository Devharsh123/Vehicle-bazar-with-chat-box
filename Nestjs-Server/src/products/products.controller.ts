import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGaurd } from 'src/auth/auth.gaurd';
import { Product } from './interface/product.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/utils/multer.config';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(AuthGaurd)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', new MulterConfigService().createMulterOptions()),
  )
  createWithImage(
    @Request() req,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, 'file', req.user.id);
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;
    return this.productsService.createWithImage(
      req.user.id,
      createProductDto,
      imageUrl,
    );
  }

  @UseGuards(AuthGaurd)
  @Post('create')
  create(
    @Request() req,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(req.user.id, createProductDto);
  }

  @UseGuards(AuthGaurd)
  @Get('getVendorProducts')
  findVendorProduct(
    @Request() req,
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('sort') sort: 'TORENT' | 'TOBUY',
  ): Promise<{ total: number; products: Product[] }> {
    return this.productsService.findVendorPr(
      req.user.id,
      search,
      +page,
      +pageSize,
      sort,
    );
  }

  @Get('getProducts')
  findAll(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('sort') filter: 'TORENT' | 'TOBUY',
  ): Promise<{ total: number; products: Product[] }> {
    return this.productsService.findAll(search, +page, +pageSize, filter);
  }

  @UseGuards(AuthGaurd)
  @Patch('isVerified/:id')
  verifyVehicle(@Request() req, @Param('id') id: string) {
    // console.log(req.user.id, id);
    return this.productsService.verifyVehicle(req.user.id, id);
  }

  @UseGuards(AuthGaurd)
  @Patch('update/:id')
  updateVehicle(
    @Request() req,
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto?: UpdateProductDto,
  ) {
    return this.productsService.updateVehicle(
      req.user.id,
      id,
      updateProductDto,
    );
  }

  @Get('product-details/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
