import { Injectable } from '@nestjs/common';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';

@Injectable()
export class VideogameService {
  create(createVideogameDto: CreateVideogameDto) {
    return 'This action adds a new videogame';
  }

  findAll() {
    return `This action returns all videogame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videogame`;
  }

  update(id: number, updateVideogameDto: UpdateVideogameDto) {
    return `This action updates a #${id} videogame`;
  }

  remove(id: number) {
    return `This action removes a #${id} videogame`;
  }
}
