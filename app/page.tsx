"use client"
import { useEffect, useState, useRef } from "react";
import PeopleList from "./myComponents/People";
import Masonry from "./myComponents/Masonry";
import WelcomeDialog from "./myComponents/WelcomeDialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const fetchPeople = (page = 1) => {
  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default function Page() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true); // New state for drawer visibility
  const sentinelRef = useRef(null);

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      const data = await fetchPeople(page);
      const makeSet = prevPeople => {
        const s = new Set([...prevPeople.map(d => d.id), ...data.results.map(d => d.id)])
        return [...s].map(id => [...prevPeople, ...data.results].find(d => d.id === id));
      }
      setPeople(makeSet);


      setLoading(false);
    };

    loadPeople();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 }
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

      <Masonry actors={people} loading={loading}></Masonry>
      <WelcomeDialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)} />
      <div ref={sentinelRef}></div>
    </>
  );
}