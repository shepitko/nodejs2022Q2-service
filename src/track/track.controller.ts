import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get()
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') trackId: string): Track {
    const track = this.trackService.getOne(trackId);

    if (!track) {
      throw new NotFoundException(`Track with id: ${trackId} not found`);
    }

    return track;
  }

  @Post()
  create(@Body() createData: CreateTrackDto) {
    return this.trackService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') trackId: string, @Body() updateData: UpdateTrackDto) {
    const track = this.trackService.getOne(trackId);

    if (!track) {
      throw new NotFoundException(`Track with id: ${trackId} not found`);
    }

    return this.trackService.update(trackId, updateData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') trackId: string) {
    this.trackService.delete(trackId);

    this.favoriteService.deleteTrack(trackId);
  }
}
