import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Characters from '../components/Characters';
import { GlobalContext } from '../context/GlobalContext';

function AnimeDetail() {
    let { animeId } = useParams();
    const { state } = useContext(GlobalContext);
    const { setLoading } = state;
    const [animeDetail, setAnimeDetail] = useState();

    useEffect(() => {
        setLoading(true);

        if (animeId !== undefined) {
            axios
                .get(`https://api.jikan.moe/v4/anime/${animeId}`)
                .then((response) => {
                    let data = response.data.data;

                    setAnimeDetail({
                        title: data.title,
                        title_japanese: data.title_japanese,
                        status: data.status,
                        synopsis: data.synopsis,
                        type: data.type,
                        score: data.score,
                        duration: data.duration,
                        image: data.images.jpg.large_image_url,
                        rating: data.rating,
                        source: data.source,
                        episodes: data.episodes,
                        genres: data.genres.map((result) => {
                            return result.name;
                        }),
                    });

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [animeId, setAnimeDetail, setLoading]);

    // console.log(animeDetail);

    return (
        <>
            {animeDetail !== undefined && (
                <section className='flex flex-col gap-5 px-5 py-10 md:px-20 lg:flex-row'>
                    <img
                        src={animeDetail.image}
                        alt={animeDetail.title}
                        className='h-72 w-52 rounded-md'
                    />

                    <div className='flex flex-col gap-7'>
                        <div>
                            <h3 className='text-2xl font-bold'>
                                {animeDetail.title}
                            </h3>
                            <p>{animeDetail.title_japanese}</p>
                        </div>

                        <ul className='flex flex-col gap-1 text-xs'>
                            <li>Type : {animeDetail.type}</li>
                            <li>Episodes : {animeDetail.episodes}</li>
                            <li>Duration: {animeDetail.duration} </li>
                            <li>Source : {animeDetail.source}</li>
                            <li>Rating : {animeDetail.rating}</li>
                            <li>Genre : {animeDetail.genres.join(', ')}</li>
                        </ul>

                        <div>
                            <h5 className='text-sm font-semibold'>Synopsis</h5>
                            <div className='my-2 h-px w-full bg-zinc-500'></div>
                            <p className='text-xs'>{animeDetail.synopsis}</p>
                        </div>

                        <Characters />
                    </div>
                </section>
            )}
        </>
    );
}

export default AnimeDetail;
