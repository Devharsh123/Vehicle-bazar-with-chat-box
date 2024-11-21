import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { TransactionType } from '../schema/product.schema';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  brand: string;

  @IsString()
  yearOfReg: string;

  @IsString()
  registrationDescr: string;

  @IsEnum(TransactionType, {
    message: 'Valid transactionType required',
  })
  transactionType: TransactionType;

  @IsString()
  kmDriven: string;

  @IsString()
  availableLocation: string;

  @IsString()
  @IsOptional()
  pricePerDay: string;

  @IsString()
  @IsOptional()
  totalPrice: string;

  @IsBoolean()
  @IsOptional()
  isVacant: boolean;

  @IsBoolean()
  @IsOptional()
  isVerfied: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  kmDriven: string;

  @IsString()
  @IsOptional()
  availableLocation: string;

  @IsString()
  @IsOptional()
  pricePerDay: string;

  @IsEnum(TransactionType, {
    message: 'Valid transactionType required',
  })
  @IsOptional()
  transactionType: TransactionType;

  @IsString()
  @IsOptional()
  registrationDescr: string;
}
