import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVideogameDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  plataforma: string;

  @IsDateString()
  fechaLanzamiento: string;

  @IsNumber()
  precio: number;
}
