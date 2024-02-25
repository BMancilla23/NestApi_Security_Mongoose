import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class HashingService {
    // Método abstracto para generar un hash a partir de los datos proporcionados
    // El método debe ser implementado por las clases que hereden de HashingService
    abstract hash(data: string | Buffer): Promise<string>;

    // Método abstracto para comparar datos con un valor encriptado y determinar si coinciden
    // El método debe ser implementado por las clases que hereden de HashingService
    abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
