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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') trackId: string): Track {
    return this.trackService.getOne(trackId);
  }

  @Post()
  create(@Body() createData: CreateTrackDto) {
    return this.trackService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') trackId: string, @Body() updateData: UpdateTrackDto) {
    return this.trackService.update(trackId, updateData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') trackId: string) {
    return this.trackService.delete(trackId);
  }
}
