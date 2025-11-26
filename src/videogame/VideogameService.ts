import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';
import { VideogameMapper } from './videograme.mapper';

@Injectable()
export class VideogameService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVideogameDto: CreateVideogameDto) {
    const created = await this.prismaService.videoGame.create({
      data: {
        nombre: createVideogameDto.nombre,
        plataforma: createVideogameDto.plataforma,
        genero: createVideogameDto.genero,
        precio: createVideogameDto.precio,
        fecha_lanzamiento: createVideogameDto.fechaLanzamiento,
      },
    });
    return VideogameMapper.toEntity(created);
  }

  async findAll() {
    return VideogameMapper.toListEntity(
      await this.prismaService.videoGame.findMany(),
    );
  }

  async findOne(id: number) {
    if (id <= 0) throw new BadRequestException('Invalid ID');
    const videogame = await this.prismaService.videoGame.findUnique({
      where: { id: id },
    });
    if (!videogame)
      throw new NotFoundException('Videogame not found with id' + id);
    return VideogameMapper.toEntity(videogame);
  }

  async update(id: number, updateVideogameDto: UpdateVideogameDto) {
    const existingGame = await this.findOne(id);
    const updateData = Object.assign(existingGame, updateVideogameDto);
    const updated = await this.prismaService.videoGame.update({
      where: { id: id },
      data: {
        nombre: updateData.nombre,
        plataforma: updateData.plataforma,
        genero: updateData.genero,
        precio: updateData.precio,
        fecha_lanzamiento: updateData.fechaLanzamiento,
      },
    });
    return VideogameMapper.toEntity(updated);
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure it exists
    return await this.prismaService.videoGame.delete({
      where: { id: id },
    });
  }
}
