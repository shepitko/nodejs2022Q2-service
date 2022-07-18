interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
}

export class Album implements IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
}
