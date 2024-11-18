import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Model } from 'mongoose';
import { Todo } from './interface/todo.interface';

const mockTodo = (overrides = {}) => ({
  _id: '1',
  user: 'demo',
  task: 'demo task',
  ...overrides,
});

describe('TodoService', () => {
  let service: TodoService;
  let todoModel: Model<Todo>;

  beforeEach(async () => {
    const mockModel = {
      find: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: "TODO_MODEL",
          useValue: mockModel
        }],
    }).compile();

    service = module.get<TodoService>(TodoService);
    todoModel = module.get<Model<Todo>>('TODO_MODEL')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of todos', async () => {
      const todos = [
        { _id: '1', user: "user1", task: "task1" },
        { _id: '2', user: "user2", task: "task2" },
      ];

      jest.spyOn(todoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(todos)
      } as any)

      const result = await service.findAll();
      expect(result).toBe(todos);
      expect(todoModel.find).toHaveBeenCalled();
    })
  })
});
