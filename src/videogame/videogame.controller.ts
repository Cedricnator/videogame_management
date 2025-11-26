import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  ParseIntPipe,
} from '@nestjs/common';
import { VideogameService } from './VideogameService.js';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';

@Controller('videogame')
export class VideogameController {
  private readonly logger = new Logger(VideogameController.name);
  constructor(private readonly videogameService: VideogameService) {}

  @Post()
  async create(@Body() createVideogameDto: CreateVideogameDto) {
    this.logger.log(`Creating a new videogame`);
    return await this.videogameService.create(createVideogameDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Retrieving all videogames');
    return await this.videogameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    this.logger.log(`Retrieving videogame with id: ${id}`);
    return await this.videogameService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateVideogameDto: UpdateVideogameDto,
  ) {
    this.logger.log(`Updating videogame with id: ${id}`);
    return await this.videogameService.update(+id, updateVideogameDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    this.logger.log(`Deleting videogame with id: ${id}`);
    return await this.videogameService.remove(+id);
  }
}
