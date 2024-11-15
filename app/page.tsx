import PeoplePage from "./PeoplePage";
import { fetchPopularPeople, fetchPopularMovies } from "./fetchData";

const Page = async () => {
  const popularPeople = await fetchPopularPeople(1)
  const popularMovies = await fetchPopularMovies(1)
  console.log('fetchPopPeople', popularPeople);
  return <PeoplePage people={popularPeople.results} movies={popularMovies.results}></PeoplePage>

}

export default Page