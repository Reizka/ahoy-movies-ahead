import PeoplePage from "./PeoplePage";
import { fetchPopularPeople } from "./api/fetchData";

const Page = async () => {
  const popularPeople = await fetchPopularPeople(1)
  console.log(popularPeople);
  return <PeoplePage people={popularPeople.results}></PeoplePage>

}

export default Page