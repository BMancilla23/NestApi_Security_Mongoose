import { Injectable } from "@nestjs/common";
import { HashingService } from "./hashing.service";
import { compare, genSalt, hash } from "bcrypt";

@Injectable()
export class BcryptService implements HashingService {
    // Implementación del método hash utilizando la biblioteca bcrypt
    async hash(data: string | Buffer): Promise<string> {
        // Genera un salt para el hash utilizando bcrypt
        const salt = await genSalt();
        
        // Genera el hash de los datos utilizando bcrypt y el salt generado
        return hash(data, salt);
    }

    // Implementación del método compare utilizando la biblioteca bcrypt
    compare(data: string | Buffer, encrypted: string): Promise<boolean> {
        // Compara los datos proporcionados con el valor encriptado utilizando bcrypt
        return compare(data, encrypted);
    }
}
