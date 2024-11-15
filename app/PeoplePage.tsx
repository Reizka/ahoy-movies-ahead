"use client"
import { useEffect, useState, useRef, useCallback } from "react";
import Masonry from "./myComponents/Masonry";
import WelcomeDialog from "./myComponents/WelcomeDialog";
import { Input } from "@/components/ui/input";
import { Movie } from './types';  // Add this import
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  // ... add other specific properties you need
}

interface ApiResponse {
  results: Person[];
}

const makeSet = (prevPeople: Person[], data: ApiResponse) => {
  const s = new Set([...prevPeople.map(d => d.id), ...data.results.map(d => d.id)])
  return Array.from(s).map(id => [...prevPeople, ...data.results].find(d => d.id === id));
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

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function PeoplePage({ people: initialPeople, movies: initialMovies }: { people: Person[], movies: Movie[] }) {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true); // New state for drawer visibility
  const sentinelRef = useRef(null);


  const [isMovies, setIsMovies] = useState(true)
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 200);

  const masonryRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isFirstLoad = useRef(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value === '') {
      setPeople(initialPeople)
      setMovies(initialMovies)
      return
    }
    // containerRef.current.scrollTop = 0
    timeoutRef.current = setTimeout(async () => {
      await loadData(value, 1)
    }, 300);

    window.scrollTo({ top: 0, behavior: 'smooth' })
  };


  // useEffect(() => {
  //   containerRef.current.scrollTop = 0
  // }, [debouncedSearch])

  const pageRef = useRef(1);

  const loadData = useCallback(async (query: string, page: number) => {
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);
    try {
      const [data, data1] = await Promise.all([
        query ? searchPeople(query, page) : fetchPopActors(page),
        query ? searchMovies(query, page) : fetchPopMovies(page)
      ]);

      if (data?.results) {
        setPeople(prevPeople => page === 1 ? data.results : makeSet(prevPeople, data));
      } else {
        setPeople([]);
      }

      if (data1?.results) {
        setMovies(prevMovies => page === 1 ? data1.results : [...prevMovies, ...data1.results]);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]); // Add loading to dependencies

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isFirstLoad.current) {
          isFirstLoad.current = false;
          return;
        }
        if (entries[0].isIntersecting && !loading && (movies.length > 0 || people.length > 0)) {
          console.log('entries[0].isIntersecting', entries[0].isIntersecting)
          pageRef.current = pageRef.current + 1;
          loadData(searchQuery, pageRef.current);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sentinelRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, isMovies, loadData, movies.length, people.length, searchQuery]);

  // useEffect(() => {
  //   // window.scrollTo({ top: 0, behavior: 'smooth' })

  // }, [debouncedSearch])

  return (
    <>
      <ScrollArea ref={masonryRef}
        className="container mx-auto px-4 py-4 relative">
        <div className="sticky z-10 top-0 flex-1">
          <div className="relative py-3">
            <div className="px-2">
              <div className="bg-white flex items-center rounded-lg border-2 shadow-md">
                <Input
                  id="largeInput"
                  type="search"
                  value={searchQuery}
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
                      loadData(searchQuery, 1)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  />
                  <span className="text-sm text-gray-500">Movies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Masonry
          actors={people}
          loading={loading}
          isMovies={isMovies}
          movies={movies}
          containerRef={containerRef}
        />
        <WelcomeDialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)} />
        <div className="h-20" ref={sentinelRef}></div>
      </ScrollArea>
    </>
  );
}
