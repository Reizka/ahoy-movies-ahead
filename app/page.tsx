"use client"
import { useEffect, useState, useRef } from "react";
import PeopleList from "./myComponents/People";
import Masonry from "./myComponents/Masonry";
import WelcomeDialog from "./myComponents/WelcomeDialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchPeople } from "./fetchData";
import { useDebounce } from "@/lib/utils";
import { fetchPopularPeople } from "./fetchData";


const makeSet = (prevPeople, data) => {
  const s = new Set([...prevPeople.map(d => d.id), ...data.results.map(d => d.id)])
  return [...s].map(id => [...prevPeople, ...data.results].find(d => d.id === id));
}

export default function Page() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true); // New state for drawer visibility
  const sentinelRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery, 500) // 500ms delay



  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('fire')
    setSearchQuery(e.target.value);
    setPeople([]); // Reset people when search query changes
    setPage(1);
  }

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      const data = searchQuery !== '' ? await searchPeople(searchQuery, page) : await fetchPopularPeople(page);

      if (data?.results) {  // Add null check
        setPeople(prevPeople => makeSet(prevPeople, data));
      }
      setLoading(false);
    };

    loadPeople();
  }, [page, debouncedValue]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const dialog = !(params.get('dialog') === 'false')
    console.log('dialog', dialog)
    setDialogOpen(dialog)

  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.6 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  return (
    <>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="sticky z-10 top-0 flex-1    ">
          <div className="relative py-3">
            {/* <Search className="absolute text-xl  top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
            <div className="px-2 flex">

              <div className="bg-white flex flex-1 rounded-lg">

                <Input
                  id="largeInput"
                  type="search"
                  placeholder="Search actors..."
                  onChange={handleSearch}
                  className="text-lg py-6 px-4  flex-1"
                />
              </div>
            </div>
          </div>
        </div>
        <Masonry actors={people} loading={loading}></Masonry>
        <WelcomeDialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)} />
        <div className="h-20" ref={sentinelRef}></div>
      </div>
    </>
  );
}