import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [{
        provide: TodoService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn()
        }
      }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create',()=>{
  //   it('should call with correct params', async()=>{
  //     const createTodoDto: CreateTodoDto = { id: 1, user: 'Test Todo', task: 'Test Description' };
  //     const result = createTodoDto;

  //     jest.spyOn(service, 'create').mockResolvedValue(result);
  //     expect(await controller.create(createTodoDto)).toBe(result);
  //     expect(service.create).toHaveBeenCalledWith(createTodoDto);
  //   })
  // })

  describe('findAll',()=>{
    it('it should return array of todos',async()=>{
      const result = [{"id": 1, "task": "Test Description", "user": "Test Todo"}] ;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
    })
  })
});
