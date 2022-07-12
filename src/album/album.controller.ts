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
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get()
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') albumId: string): Album {
    const album = this.albumService.getOne(albumId);

    if (!album) {
      throw new NotFoundException(`Album with id: ${albumId} not found`);
    }

    return album;
  }

  @Post()
  create(@Body() createData: CreateAlbumDto) {
    return this.albumService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') albumId: string, @Body() updateData: UpdateAlbumDto) {
    const album = this.albumService.getOne(albumId);

    if (!album) {
      throw new NotFoundException(`Album with id: ${albumId} not found`);
    }

    return this.albumService.update(albumId, updateData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') albumId: string) {
    this.albumService.delete(albumId);

    const tracks = this.trackService.getAllByAlbumId(albumId);

    tracks.map((track) =>
      this.trackService.update(track.id, { albumId: null }),
    );

    this.favoriteService.deleteAlbum(albumId);
  }
}
