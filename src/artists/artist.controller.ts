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
import { AlbumService } from 'src/album/album.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') artistId: string): Artist {
    const artist = this.artistService.getOne(artistId);

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${artistId} not found`);
    }

    return artist;
  }

  @Post()
  create(@Body() createData: CreateArtistDto) {
    return this.artistService.create(createData);
  }

  @Put('/:id')
  update(@Param('id') artistId: string, @Body() updateData: UpdateArtistDto) {
    const artist = this.artistService.getOne(artistId);

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${artistId} not found`);
    }

    return this.artistService.update(artist.id, updateData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') artistId: string) {
    this.artistService.delete(artistId);

    const albums = this.albumService.getAllByArtistId(artistId);
    albums.map((album) =>
      this.albumService.update(album.id, { artistId: null }),
    );

    const tracks = this.trackService.getAllByArtistId(artistId);

    tracks.map((track) =>
      this.trackService.update(track.id, { artistId: null }),
    );

    this.favoriteService.deleteArtist(artistId);
  }
}
