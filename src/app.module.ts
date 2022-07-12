import { Module } from '@nestjs/common';
import { ArtistController } from './artists/artist.controller';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { UsersController } from './users/users.controller';
import { ArtistService } from './artists/artist.service';
import { TracksService } from './tracks/tracks.service';
import { UsersService } from './users/users.service';
import { FavoritesService } from './favorites/favorites.service';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [],
  controllers: [
    ArtistController,
    TracksController,
    AlbumsController,
    FavoritesController,
    UsersController,
  ],
  providers: [
    ArtistService,
    TracksService,
    UsersService,
    FavoritesService,
    AlbumsService,
  ],
})
export class AppModule {}
