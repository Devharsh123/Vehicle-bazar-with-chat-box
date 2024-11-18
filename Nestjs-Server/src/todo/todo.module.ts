import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from 'src/database/database.module';
import { todoProviders } from './todo.providers';

@Module({
  controllers: [TodoController],
  providers: [TodoService, ...todoProviders],
  imports: [DatabaseModule]
})
export class TodoModule {}
