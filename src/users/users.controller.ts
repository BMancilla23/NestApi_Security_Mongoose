import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterUserDto } from './dto/filter-user.dto';
import { User } from './entities/user.entity';
import { object } from 'joi';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  }) // Decorador para especificar la respuesta en Swagger
  @ApiOperation({ summary: 'Create a new user' }) // Decorador para describir la operación en Swagger
  @ApiBody({ type: CreateUserDto }) // Especifica el tipo de cuerpo de la solicitud en Swagger
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @ApiQuery({
    name: 'firstName',
    required: false,
    description: 'First name of the user',
  })
  @ApiQuery({
    name: 'lastName',
    required: false,
    description: 'Last name of the user',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of records per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset for pagination',
  })
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'ALL Data list',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'this is unique id',
          },
          email: {
            type: 'string',
            description: 'this is email',
          },
          firstName: {
            type: 'string',
            description: 'this is firstName',
          },
          lastName: {
            type: 'string',
            description: 'this is lastName',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del usuario',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de la última actualización del usuario',
          },
        },
      },
    },
  })
  @Get('all')
  async findAll(@Query() params?: FilterUserDto) {
    const users = await this.usersService.findAll(params);
    return users;
  }

  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID of the user' },
        email: { type: 'string', description: 'Email of the user' },
        firstName: { type: 'string', description: 'First name of the user' },
        lastName: { type: 'string', description: 'Last name of the user' },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Fecha de creación del usuario',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Fecha de la última actualización del usuario',
        },
        // Agrega aquí cualquier otra propiedad que necesites mostrar en la respuesta
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiOperation({ summary: 'Find an user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'string',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User has been successfully updated',
  }) // Decorador para especificar la respuesta en Swagger
  @ApiBody({
    type: UpdateUserDto,
    description: 'Data to update the user',
    schema: {
      example: {
        firtName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }
  })
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'ID of the user', type: 'string' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'User has been successfully deleted',
  }) // Decorador para especificar la respuesta en Swagger
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiOperation({summary: 'Delete a user'})
  @ApiParam({name: 'id', description: 'ID of the user', type: 'string'})
  
  /** Eliminación lógica de una colección */
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User has been successfully removed',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiOperation({summary: 'Remove a user permanently'})
  @ApiParam({name: 'id', description: 'ID of the user', type: 'string'})
  /** Eliminación física de una colección */
  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
  
}
