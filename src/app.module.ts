import { Module } from '@nestjs/common';
import { ArtistsController } from './artists/artists.controller';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { UsersController } from './users/users.controller';
import { ArtistsService } from './artists/artists.service';
import { TracksService } from './tracks/tracks.service';
import { UsersService } from './users/users.service';
import { FavoritesService } from './favorites/favorites.service';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [],
  controllers: [
    ArtistsController,
    TracksController,
    AlbumsController,
    FavoritesController,
    UsersController,
  ],
  providers: [
    ArtistsService,
    TracksService,
    UsersService,
    FavoritesService,
    AlbumsService,
  ],
})
export class AppModule {}
