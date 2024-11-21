import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  saltOrRounds = 10;

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN', age?: number) {
    // if (role) {
    //     const rolesArray = this.users.filter(user => user.role === role);
    //      if(rolesArray.length === 0) {
    //         throw new NotFoundException('User Role Not Found');
    //      }
    //      return rolesArray;
    // }
    return this.userModel.find().exec();
  }

  // async findOne(name: string) {
  //     const rep = await this.userModel.findOne({ name }).exec();
  //     return { id: rep._id, name: rep.name,
  //          email: rep.email, role: rep.role, password: rep.password }
  // }

  async findOne(email: string) {
    const rep = await this.userModel.findOne({ email }).exec();
    // console.log(rep, 'rep');
    if (!rep) {
      return null;
    }
    return {
      id: rep._id,
      name: rep.name,
      email: rep.email,
      role: rep.role,
      password: rep.password,
      verified: rep.isVerified,
    };
  }

  async findById(id: string) {
    const res = await this.userModel.findById(id);
    return {
      id: res.id,
      name: res.name,
      email: res.email,
      role: res.role,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    // console.log(email, 'email');

    const isUserExist = await this.findOne(email);
    // console.log(isUserExist, 'isUserExist');
    if (isUserExist) {
      throw new Error('Check your email: Email already exists');
    }
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    const createUser = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });
    await createUser.save();

    return {
      message: `User created succesfully`,
    };
    // const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    // const newUser = {
    //     id: usersByHighestId[0].id + 1,
    //     ...createUserDto
    // }
    // this.users.push(newUser);
    // return newUser;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //     this.users = this.users.map(user => {
  //         if (user.id === id) {
  //             return { ...user, ...updateUserDto }
  //         }

  //         return user;
  //     })
  //     return this.findOne(id);
  // }

  // delete(id: number) {
  //     const removedUser = this.findOne(id);

  //     this.users = this.users.filter(user => user.id !== id);
  //     return removedUser;
  // }
}
