import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAll(): Album[] {
    return this.albums;
  }

  getOne(id: string): Album {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album's id is invalid`);
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    return album;
  }

  create(createData: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...createData,
    };
    this.albums.push(album);

    return album;
  }

  update(id: string, updateData: UpdateAlbumDto): Album {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album's id is invalid`);
    }

    this.albums = this.albums.map((album) => {
      return album.id === id ? { ...album, ...updateData } : album;
    });

    return this.getOne(id);
  }

  delete(id: string): void {
    if (!validateUUID(id)) {
      throw new BadRequestException(`Album's id is invalid`);
    }

    const album = this.getOne(id);
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
