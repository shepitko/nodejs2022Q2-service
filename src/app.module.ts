import { Module } from '@nestjs/common';
import { ArtistController } from './artists/artist.controller';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { FavoriteController } from './favorite/favorite.controller';
import { UserController } from './user/user.controller';
import { ArtistService } from './artists/artist.service';
import { TrackService } from './track/track.service';
import { UserService } from './user/user.service';
import { FavoriteService } from './favorite/favorite.service';
import { AlbumService } from './album/album.service';

@Module({
  imports: [],
  controllers: [
    ArtistController,
    TrackController,
    AlbumController,
    FavoriteController,
    UserController,
  ],
  providers: [
    ArtistService,
    TrackService,
    UserService,
    FavoriteService,
    AlbumService,
  ],
})
export class AppModule {}
