import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './entities/movie.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAll(): Artist[] {
    return this.artists;
  }

  getOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    return artist;
  }

  create(createData): Artist {
    const artist = {
      id: uuidv4(),
      ...createData,
    };
    this.artists.push(artist);

    return artist;
  }

  update(id: string, updateData): Artist {
    this.artists = this.artists.map((artist) => {
      return artist.id === id ? { ...artist, ...updateData } : artist;
    });

    return this.getOne(id);
  }

  delete(id: string): boolean {
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return true;
  }
}
