"use Client"

import { useEffect, useState } from "react";

export function People() {

    const [people, setPeople] = useState(undefined);


    useEffect(() => {

        const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ}`
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(data => {

                console.log('People component data', data)
                setPeople(data.results)
            })
            .catch(err => console.error('error:' + err));
    })

    console.log('People component', people);
    if (people === undefined) return <div>Loading...</div>
    return <ul>
        {people.map(person => <li key={person.id}>{person.name}</li>)}
    </ul>


}