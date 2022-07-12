import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  readonly name?: string;

  @IsBoolean()
  readonly grammy?: boolean;
}
