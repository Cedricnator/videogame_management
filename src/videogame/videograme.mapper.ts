import { VideoGame } from 'prisma/generated/client';
import { VideogameEntity } from './entities/videogame.entity';

export class VideogameMapper {
  static toEntity(raw: VideoGame): VideogameEntity {
    return new VideogameEntity(
      raw.id,
      raw.nombre,
      raw.genero,
      raw.plataforma,
      raw.fecha_lanzamiento,
      raw.precio,
    );
  }

  static toListEntity(rawList: VideoGame[]): VideogameEntity[] {
    return rawList.map((raw) => this.toEntity(raw));
  }
}
