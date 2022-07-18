import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { TrackService } from 'src/track/track.service';

import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  private favorite: Favorite = { artists: [], albums: [], tracks: [] };

  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  getAll(): Favorite {
    return this.favorite;
  }

  addTrack(id: string): Favorite {
    const track = this.trackService.getOne(id);
    if (!track) throw new UnprocessableEntityException(`track doesn't exist`);

    this.favorite.tracks.push(track);

    return this.favorite;
  }

  deleteTrack(id: string): void {
    this.favorite.tracks = this.favorite.tracks.filter(
      (track) => track.id !== id,
    );
  }

  addAlbum(id: string): Favorite {
    const album = this.albumService.getOne(id);
    if (!album) throw new UnprocessableEntityException(`album doesn't exist`);

    this.favorite.albums.push(album);

    return this.favorite;
  }

  deleteAlbum(id: string): void {
    this.favorite.albums = this.favorite.albums.filter(
      (album) => album.id !== id,
    );
  }

  addArtist(id: string): Favorite {
    const artist = this.artistService.getOne(id);
    if (!artist) throw new UnprocessableEntityException(`artist doesn't exist`);

    this.favorite.artists.push(artist);

    return this.favorite;
  }

  deleteArtist(id: string): void {
    this.favorite.artists = this.favorite.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
