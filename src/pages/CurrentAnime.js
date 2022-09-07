import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CurrentAnime() {
    const { state } = useContext(GlobalContext);
    const { animeList, setAnimeList, setLoading, setCurrentPage } = state;

    useEffect(() => {
        setCurrentPage('ongoing-anime');

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
        <section className='flex flex-col items-center px-5 py-10 md:items-start md:px-20'>
            <h2 className='mb-7 text-lg font-semibold'>Ongoing Anime List</h2>
            <div className='flex flex-wrap justify-center gap-5 md:justify-start'>
                {animeList &&
                    animeList
                        .filter((anime) => {
                            return anime.airing === true;
                        })
                        .map((anime) => {
                            const { title, mal_id, score } = anime;
                            const { large_image_url } = anime.images.jpg;

                            return (
                                <Link
                                    key={mal_id}
                                    to={`/anime/${mal_id}/${title
                                        .split(' ')
                                        .join('_')}`}
                                    className='group relative h-fit w-fit cursor-pointer overflow-hidden rounded-md bg-zinc-100'
                                >
                                    <img
                                        src={large_image_url}
                                        alt={title}
                                        className='h-56 w-40'
                                    />
                                    <div className='absolute -bottom-[3.3rem] left-0 h-24 w-40 bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] text-white transition-all duration-300 group-hover:bottom-0'>
                                        <div className='flex items-center gap-1'>
                                            <svg
                                                className='h-4 w-4 fill-yellow-500'
                                                viewBox='0 0 20 20'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                            </svg>
                                            <p className='font-semibold'>
                                                {score}
                                            </p>
                                        </div>
                                        <p>{title}</p>
                                    </div>
                                </Link>
                            );
                        })}
            </div>
        </section>
    );
}

export default CurrentAnime;
