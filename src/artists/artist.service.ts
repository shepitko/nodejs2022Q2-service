import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAll(): Artist[] {
    return this.artists;
  }

  getOne(id: string): Artist {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist's id is invalid`);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    return artist;
  }

  create(createData: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      ...createData,
    };
    this.artists.push(artist);

    return artist;
  }

  update(id: string, updateData: UpdateArtistDto): Artist {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist's id is invalid`);
    }

    this.artists = this.artists.map((artist) => {
      return artist.id === id ? { ...artist, ...updateData } : artist;
    });

    return this.getOne(id);
  }

  delete(id: string): void {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Artist's id is invalid`);
    }

    const artist = this.getOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
