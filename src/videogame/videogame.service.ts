import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';
import { PrismaService } from 'prisma/prisma.service';
import { VideogameMapper } from './videograme.mapper';
import { VideogameEntity } from './entities/videogame.entity';

@Injectable()
export class VideogameService {
  private readonly logger = new Logger(VideogameService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createVideogameDto: CreateVideogameDto,
  ): Promise<VideogameEntity> {
    this.logger.log(
      'Creating a new videogame with params: ' +
        JSON.stringify(createVideogameDto),
    );
    const created = await this.prismaService.videoGame.create({
      data: {
        nombre: createVideogameDto.nombre,
        plataforma: createVideogameDto.plataforma,
        genero: createVideogameDto.genero,
        precio: createVideogameDto.precio,
        fecha_lanzamiento: new Date(createVideogameDto.fechaLanzamiento),
      },
    });
    return VideogameMapper.toEntity(created);
  }

  async findAll(): Promise<VideogameEntity[]> {
    this.logger.log('Retrieving all videogames');
    return VideogameMapper.toListEntity(
      await this.prismaService.videoGame.findMany(),
    );
  }

  async findOne(id: number): Promise<VideogameEntity> {
    this.logger.log('Retrieving videogame with id: ' + id);
    if (id <= 0) throw new BadRequestException('Invalid ID');
    const videogame = await this.prismaService.videoGame.findUnique({
      where: { id: id },
    });
    if (!videogame)
      throw new NotFoundException('Videogame not found with id' + id);
    return VideogameMapper.toEntity(videogame);
  }

  async update(
    id: number,
    updateVideogameDto: UpdateVideogameDto,
  ): Promise<VideogameEntity> {
    this.logger.log('Updating videogame with id: ' + id);
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

  async remove(id: number): Promise<VideogameEntity> {
    this.logger.log('Deleting videogame with id: ' + id);
    await this.findOne(id); // Ensure it exists
    return VideogameMapper.toEntity(
      await this.prismaService.videoGame.delete({
        where: { id: id },
      }),
    );
  }
}
