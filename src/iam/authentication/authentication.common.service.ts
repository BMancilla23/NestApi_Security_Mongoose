import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin-auth.dto';
import { ErrorService } from 'src/errors/error.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { HashingService } from 'src/providers/hashing/hashing.service';

@Injectable()
export class AuthenticationCommonService {

    constructor(@InjectModel(User.name)private readonly userModel: Model<User>,  private readonly errorService: ErrorService, private readonly hashingService: HashingService){}

    async findUserAuthenticated(signInDto: SignInDto){
        try {
            // Buscamos los datos del usuario
            const user = await this.userModel.findOne({ email: signInDto.email.trim() }).exec();


            // Si el usuario no existe enviamos una excepcion
            if (!user) {
                throw new BadRequestException("Por favor ingrese un email y/o cotraseña válida")
            }

            // Confirmamos que la contraseña sea la correcta
            const isPasswordMatched = await this.hashingService.compare(signInDto.password.trim(), user.password);

            if (!isPasswordMatched) {
                throw new BadRequestException("Por favor ingrese un email y/o contraseña válida")
            }

            // Eliminamos el campo de contraseña de la respuesta antes de devolver 
            const  {password, ...userWithoutPassword} = user.toObject();
            return userWithoutPassword;
        } catch (error) {
            this.errorService.createError(error);
        }
    }
}
