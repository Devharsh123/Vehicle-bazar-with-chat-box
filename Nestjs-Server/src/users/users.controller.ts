import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // /users
export class UsersController {
  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */
  constructor(private readonly usersService: UsersService) {}

  @Get() //GET /users or /users?role=value&age=42
  findAll(
    @Query('role') role?: 'INTERN' | 'Engineer' | 'ADMIN',
    @Query('age') age?: number,
  ) {
    return this.usersService.findAll();
  }

  @Get(':name') //GET /users/:id
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Post() //POST /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    console.log(createUserDto, 'dto');
    return this.usersService.create(createUserDto);
  }

  // @Patch(':id') //PATCH /users/:id
  // update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //     return this.usersService.delete(id);
  // }
  // }
}
