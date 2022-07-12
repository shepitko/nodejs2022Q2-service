import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAll(): Track[] {
    return this.tracks;
  }

  getOne(id: string): Track {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track's id is invalid`);
    }
    const track = this.tracks.find((track) => track.id === id);

    return track;
  }

  getAllByArtistId(artistId: string): Track[] {
    const tracks = this.tracks.filter((track) => track.artistId === artistId);

    return tracks;
  }

  getAllByAlbumId(albumId: string): Track[] {
    const tracks = this.tracks.filter((track) => track.albumId === albumId);

    return tracks;
  }

  create(createData: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      ...createData,
    };
    this.tracks.push(track);

    return track;
  }

  update(id: string, updateData: UpdateTrackDto): Track {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track's id is invalid`);
    }

    this.tracks = this.tracks.map((track) => {
      return track.id === id ? { ...track, ...updateData } : track;
    });

    return this.getOne(id);
  }

  delete(id: string): void {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Track's id is invalid`);
    }

    const track = this.getOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
