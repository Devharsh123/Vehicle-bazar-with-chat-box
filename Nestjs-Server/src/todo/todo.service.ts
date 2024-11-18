import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interface/todo.interface';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_MODEL')
    private todoModel: Model<Todo>
  ) { }
  
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return createTodoDto;
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
