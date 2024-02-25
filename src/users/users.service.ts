import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { FilterQuery, Model } from 'mongoose';
import { FilterUserDto } from './dto/filter-user.dto';
import { HashingService } from 'src/providers/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, private readonly hashingService: HashingService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Hasheamos la contraseña
      createUserDto.password = await this.hashingService.hash(createUserDto.password.trim())
      const newRecord = new this.userModel(createUserDto);
      return await newRecord.save();
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  // Método para buscar usuarios con filtros opcionales
  async findAll(params?: FilterUserDto) {
    try {
      const filters: FilterQuery<User> = {isDeleted: false};
      const { limit = 10, offset = 0, firstName, lastName } = params; // Los valores por defecto de limit y offset tambien puede colocarse en FilterUserDto la elección depende del uso
      if (params) {
        if (firstName) {
          // Filtrar por primer nombre
          filters.firstName = {
            
              $regex: firstName,
              $options: 'i', // Insensible a mayúsculas y minúsculas
            
          };
        }
        if (lastName) {
          // Filtrar por apellido
          filters.lastName = {
              $regex: lastName,
              $options: 'i', // Insensible a mayúsculas y minúsculas
           
          };
        }
      }

      // Ejecuta simultáneamente dos consultas:
      // 1. Consulta para obtener los registros según los filtros y la paginación
      // 2. Consulta para contar el total de documentos que coinciden con los filtros
      const [records, totalDocuments] = await Promise.all([
        this.userModel
        .find(filters)
        .limit(limit)
        .skip(offset * limit)
        .exec(),
        this.userModel
        .countDocuments(filters)
        .exec()
      ])

      // Realizar la búsqueda con los filtros y paginación
      /* const records = await this.userModel
        .find(filters)
        .limit(limit)
        .skip(offset * limit)
        .exec(); */

      // Obtener el total de documentos que coinciden con los filtros
      /* const totalDocuments = await this.userModel
        .countDocuments(filters)
        .exec();
 */
      // Devolver los registros encontrados y el total de documentos
      return {
        records,
        totalDocuments,
      };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: string): Promise<User> {
    try {

      /** Buscamos la colección por el ID */
      const record = await this.userModel.findById(id.trim()).exec();

      /** Si la colección no existe */
      if (!record) {
        throw new NotFoundException('Registro no encontrado');
      }

      /** Preguntamos si la colección no esta eliminado (logico) */
      if (record.isDeleted) {
        throw new NotFoundException("Registro no encontrado");
      }

      return record;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const record = await this.findOne(id);

    // Hasheamos la contraseña
    updateUserDto.password = await this.hashingService.hash(updateUserDto.password.trim())  
    return await this.userModel.findByIdAndUpdate(record.id, {$set: updateUserDto}, {new:true, runValidators: true}).exec()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async delete(id: string) {
    const record = await this.findOne(id);
    return await this.userModel.findByIdAndUpdate(record.id, {$set: {isDeleted: !record.isDeleted}}, {new: true, runValidators: true} ).exec()
  }

  async remove(id: string){
    await this.findOne(id);
    return await this.userModel.findByIdAndDelete(id).exec()
  }
}
