import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorLoggerService } from './error-logger.service';

@Injectable()
export class ErrorService {
  constructor(private readonly errorLoggerService: ErrorLoggerService) {}
  createError(error: any) {
    // Registramos el error en nuestro log
    this.errorLoggerService.createErrorLog('Erro capturado en el catch', error);

    // Mensaje personalizado cuando existe un registro duplicado
    if (error && error.code === 11000 && error.keyValue) {
      const fieldName = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[fieldName];
      throw new BadRequestException(
        `El campo ${fieldName} con valor ${duplicateValue} ya existe`,
      );
    }
    // Mensaje de error por defecto
    throw new InternalServerErrorException(error.message);
  }
}
