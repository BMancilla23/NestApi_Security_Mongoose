import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { HashingService } from 'src/providers/hashing/hashing.service';
import { BcryptService } from 'src/providers/hashing/bcrypt.service';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [
    {provide: HashingService, // El token del proveedor es la clase abstracta
     useClass: BcryptService // Se especifica la implementación concreta
    }, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
