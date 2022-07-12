import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getAll(): Favorite {
    return this.favoriteService.getAll();
  }

  @Post('/track/:id')
  addTrack(@Param('id') trackId: string): Favorite {
    return this.favoriteService.addTrack(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') trackId: string) {
    return this.favoriteService.deleteTrack(trackId);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') albumId: string): Favorite {
    return this.favoriteService.addAlbum(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') trackId: string) {
    return this.favoriteService.deleteAlbum(trackId);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') artistId: string): Favorite {
    return this.favoriteService.addArtist(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') artistId: string) {
    return this.favoriteService.deleteArtist(artistId);
  }
}
