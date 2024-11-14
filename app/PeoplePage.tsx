"use client"
import { useEffect, useState, useRef } from "react";
import Masonry from "./myComponents/Masonry";
import WelcomeDialog from "./myComponents/WelcomeDialog";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/client_utils";
import { Movie, Actor } from './types';  // Add this import
import { Switch } from "@/components/ui/switch"


const makeSet = (prevPeople: any[], data: any) => {
  const s = new Set([...prevPeople.map(d => d.id), ...data.results.map(d => d.id)])
  return [...s].map(id => [...prevPeople, ...data.results].find(d => d.id === id));
}

async function searchMovies(query?: string, page: number = 1) {
  console.log('query IIIIIIIII', query)
  const response = await fetch(
    `/api/movies?${new URLSearchParams({
      ...(query && { query }),
      page: page.toString()
    })}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
}

async function searchPeople(query?: string, page: number = 1) {
  console.log('query IIIIIIIII', query)
  const response = await fetch(
    `/api/actors?${new URLSearchParams({
      ...(query && { query }),
      page: page.toString()
    })}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
}

export async function fetchPopActors(page: number = 1) {
  const response = await fetch(
    `/api/pop-actors?${new URLSearchParams({
      page: page.toString()
    })}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch popular actors');
  }

  return response.json();
}

export async function fetchPopMovies(page: number = 1) {
  const response = await fetch(
    `/api/pop-movies?${new URLSearchParams({
      page: page.toString()
    })}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }

  return response.json();
}

export default function PeoplePage({ people: initialPeople }: { people: any[] }) {
  const [people, setPeople] = useState(initialPeople);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true); // New state for drawer visibility
  const sentinelRef = useRef(null);


  const [isMovies, setIsMovies] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = debouncedSearch
          ? await searchPeople(debouncedSearch, page)
          : await fetchPopActors(page);
        const data1 = debouncedSearch
          ? await searchMovies(debouncedSearch, page)
          : await fetchPopMovies(page);

        if (data?.results) {
          setPeople(prevPeople => page === 1 ? data.results : makeSet(prevPeople, data));
        }
        if (data1?.results) {
          setMovies(page === 1 ? data1.results : prevMovies => [...prevMovies, ...data1.results]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, debouncedSearch]);

  useEffect(() => {
    setPage(1);
    setPeople([]);
    setMovies([]);
  }, [debouncedSearch]);

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
          if ((isMovies && movies.length > 0) || (!isMovies && people.length > 0)) {
            setPage(prevPage => prevPage + 1);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, isMovies, movies.length, people.length]);

  return (
    <>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="sticky z-10 top-0 flex-1">
          <div className="relative py-3">
            <div className="px-2">
              <div className="bg-white flex items-center rounded-lg border-2 shadow-md">
                <Input
                  id="largeInput"
                  type="search"
                  placeholder={isMovies ? "Search movies..." : "Search actors..."}
                  onChange={handleSearch}
                  className="text-lg py-6 px-4 flex-1 border-0 shadow-none"
                />
                <div className="flex items-center gap-2 pr-4 ml-1 ">
                  <span className="text-sm text-gray-500">Actors</span>
                  <Switch
                    checked={isMovies}
                    onCheckedChange={() => {
                      setIsMovies(!isMovies);
                      setPage(1)
                      setPeople([])
                      setMovies([])
                    }}
                  />
                  <span className="text-sm text-gray-500">Movies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Masonry actors={people} loading={loading} isMovies={isMovies} movies={movies}></Masonry>
        <WelcomeDialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)} />
        <div className="h-20" ref={sentinelRef}></div>
      </div>
    </>
  );
}
