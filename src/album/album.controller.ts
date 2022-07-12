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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') albumId: string): Album {
    return this.albumService.getOne(albumId);
  }

  @Post()
  create(@Body() createData: CreateAlbumDto) {
    return this.albumService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') albumId: string, @Body() updateData: UpdateAlbumDto) {
    return this.albumService.update(albumId, updateData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') albumId: string) {
    return this.albumService.delete(albumId);
  }
}
