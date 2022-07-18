import { IsOptional, IsUUID } from 'class-validator';

const UUID_VERSION = '4';

export class CreateFavoriteDto {
  @IsOptional()
  @IsUUID(UUID_VERSION, { each: true })
  artists: string[]; // favorite artists ids

  @IsOptional()
  @IsUUID(UUID_VERSION, { each: true })
  albums: string[]; // favorite albums ids

  @IsOptional()
  @IsUUID(UUID_VERSION, { each: true })
  tracks: string[]; // favorite tracks ids
}
