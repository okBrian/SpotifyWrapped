export type Language = "English" | "Chinese" | "Korean";

export type LanguageType = {
  lang: Language,
  minutesListened: string,
  topGenre: string,
  your: string,
  top5: string,
  artists: string,
  darkMode: string,
};

export type Album = {
  name: string,
  imageUrl: string,
  userFavTrack: string,
};

export type Artist = {
  name: string,
  imageUrl: string,
  popularity: number,
};

export type Genre = {
  name: string,
};

export type UserDescriptionType = {
  english: string,
  chinese: string,
  korean: string,
}

export type WrappedInfo = {
  id: string,
  timestamp: number,
  genreDiversity: number,
  topArtists: Artist[],
  topAlbums: Album[],
  topGenres: Genre[],
  recentTrack: string,
  userDescription: UserDescriptionType,
};

export const DEFAULT_ARTIST: Artist = {
  name: "Artist",
  imageUrl: "",
  popularity: 10,
};

export const DEFAULT_ALBUM: Album = {
  name: "Artist",
  imageUrl: "",
  userFavTrack: "Favorite Track",
};

export const DEFAULT_GENRE: Genre = {
  name: "Genre",
};

export const DEFAULT_WRAPPED: WrappedInfo = {
  id: "dummy",
  timestamp: Date.now(),
  genreDiversity: 10,
  topArtists: [
    DEFAULT_ARTIST,
    DEFAULT_ARTIST,
    DEFAULT_ARTIST,
    DEFAULT_ARTIST,
    DEFAULT_ARTIST,
  ],
  topAlbums: [
    DEFAULT_ALBUM,
    DEFAULT_ALBUM,
    DEFAULT_ALBUM,
    DEFAULT_ALBUM,
    DEFAULT_ALBUM,
  ],
  topGenres: [
    DEFAULT_GENRE,
    DEFAULT_GENRE,
    DEFAULT_GENRE,
    DEFAULT_GENRE,
    DEFAULT_GENRE,
  ],
  recentTrack: "Most recent track",
  userDescription: {
    english: "English description",
    chinese: "Chinese description",
    korean: "Korean description",
  },
};
