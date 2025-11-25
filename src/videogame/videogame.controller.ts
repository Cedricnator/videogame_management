import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideogameService } from './videogame.service';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';

@Controller('videogame')
export class VideogameController {
  constructor(private readonly videogameService: VideogameService) {}

  @Post()
  create(@Body() createVideogameDto: CreateVideogameDto) {
    return this.videogameService.create(createVideogameDto);
  }

  @Get()
  findAll() {
    return this.videogameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videogameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideogameDto: UpdateVideogameDto) {
    return this.videogameService.update(+id, updateVideogameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videogameService.remove(+id);
  }
}
