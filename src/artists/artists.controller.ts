import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/movie.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') artistId: string): Artist {
    return this.artistsService.getOne(artistId);
  }

  @Post()
  create(@Body() createData) {
    return this.artistsService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') artistId: string, @Body() updateData) {
    return this.artistsService.update(artistId, updateData);
  }

  @Delete('/:id')
  delete(@Param('id') artistId: string) {
    return this.artistsService.delete(artistId);
  }
}
