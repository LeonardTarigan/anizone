import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CurrentAnime() {
    const { state } = useContext(GlobalContext);
    const { animeList, setAnimeList, setLoading, setCurrentPage } = state;

    useEffect(() => {
        setCurrentPage('on-going');

        if (animeList === undefined) {
            setLoading(true);
            axios
                .get('https://api.jikan.moe/v4/seasons/now')
                .then((response) => {
                    setAnimeList(response.data.data);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setAnimeList, setLoading, animeList, setCurrentPage]);

    return (
        <section className='px-5 py-10 md:px-20'>
            <h2 className='mb-7 text-lg font-semibold'>Ongoing Anime List</h2>
            <div className='flex flex-wrap gap-5'>
                {animeList &&
                    animeList
                        .filter((anime) => {
                            return anime.airing === true;
                        })
                        .map((anime) => {
                            const { title, mal_id } = anime;
                            const { large_image_url } = anime.images.jpg;
                            console.log(anime);

                            return (
                                <Link
                                    key={mal_id}
                                    to={`/anime/${mal_id}/${title
                                        .split(' ')
                                        .join('_')}`}
                                    className='group relative h-fit w-fit cursor-pointer overflow-hidden bg-zinc-100'
                                >
                                    <img
                                        src={large_image_url}
                                        alt={title}
                                        className='h-56 w-40'
                                    />
                                    <p className='absolute -bottom-[4.3rem] left-0 h-24 w-40 bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] text-white transition-all duration-300 group-hover:bottom-0'>
                                        {title}
                                    </p>
                                </Link>
                            );
                        })}
            </div>
        </section>
    );
}

export default CurrentAnime;
