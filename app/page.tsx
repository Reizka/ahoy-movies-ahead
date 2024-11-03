import PeoplePage from "./PeoplePage";
import { fetchPopularPeople } from "./fetchData";

const Page = async () => {
  const popularPeople = await fetchPopularPeople(1)
  return <PeoplePage people={popularPeople.results}></PeoplePage>

}

export default Page