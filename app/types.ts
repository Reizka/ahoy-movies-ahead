export interface Actor {
  id: number;
  name: string;
  // Add other required Actor properties
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  cast: Actor[]; // Remove optional flag
} 