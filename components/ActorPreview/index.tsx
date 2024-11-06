import { useCallback, useState, useEffect } from "react";
import ActorPreview from "./ActorPreview";
import { fetchRelatedActors } from "@/app/api/fetchData";




const ActorPreviewPage = ({ id, range, ...rest }) => {
    const [relatedActors, setRelatedActors] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(() => {
        setLoading(true);
        fetchRelatedActors(id, range)
            .then(data => {
                // console.log('data related', data);
                // const ms = data.map(d => d.movie);

                // console.log('ms', ms);
                // setMovies([...movies, ...ms]);
                setLoading(false);
                setRelatedActors(data.slice(0, 10));
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, range]);

    useEffect(() => {
        setLoading(true);
        loadData()


    }, [loadData, id, range]);


    return (
        <ActorPreview {...rest} id={id} range={range} relatedActors={relatedActors} ></ActorPreview>
    );
}

export default ActorPreviewPage;