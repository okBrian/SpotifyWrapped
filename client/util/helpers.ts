import { Album, Artist, Genre, WrappedInfo } from "./types";


const parseArtist = (artist: any): Artist => {
  return {
    name: artist.name,
    imageUrl: artist.image_url,
    popularity: artist.popularity,
  };
}

const parseAlbum = (album: any): Album => {
  return {
    name: album.name,
    imageUrl: album.image_url,
    userFavTrack: album.user_fav_track,
  };
}

const parseGenre = (genre: any): Genre => {
  return {
    name: genre.name,
  };
}

export const parseWrapped = (wrapped: any): WrappedInfo => {
  return {
    id: wrapped.wrap_id,
    timestamp: new Date(wrapped.date_updated).valueOf(),
    genreDiversity: wrapped.genre_diversity,
    topArtists: wrapped.top_artists.map((x: any) => parseArtist(x)),
    topAlbums: wrapped.top_albums.map((x: any) => parseAlbum(x)),
    topGenres: wrapped.top_genres.map((x: any) => parseGenre(x)),
    recentTrack: wrapped.last_played,
    userDescription: wrapped.user_description,
  };
}
