import UserDescription from "@/app/UserDescription";

export type Language = "English" | "Chinese" | "Korean";

export type LanguageType = {
  minutesListened: string,
  topGenre: string,
  your: string,
  top5: string,
  artists: string,
  darkMode: string,
};

export type WrappedInfo = {
  genreDiversity: number,
  topArtists: string[][],
  topAlbums: string[][],
  topGenres: string[][],
  recentTrack: string,
  userDescription: string,
};

export const DEFAULT_WRAPPED: WrappedInfo = {
  genreDiversity: 0,
  topArtists: [
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
  ],
  topAlbums: [
    ["Album 1", "", ""],
    ["Album 2", "", ""],
    ["Album 3", "", ""],
    ["Album 4", "", ""],
    ["Album 5", "", ""],
  ],
  topGenres: [
    [""],
    [""],
    [""],
    [""],
    [""],
  ],
  recentTrack: "",
  userDescription: "",
};
