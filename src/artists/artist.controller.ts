import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') artistId: string): Artist {
    return this.artistService.getOne(artistId);
  }

  @Post()
  create(@Body() createData: CreateArtistDto) {
    return this.artistService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') artistId: string, @Body() updateData: UpdateArtistDto) {
    return this.artistService.update(artistId, updateData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') artistId: string) {
    return this.artistService.delete(artistId);
  }
}
