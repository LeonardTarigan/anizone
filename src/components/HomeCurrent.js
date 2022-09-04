import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeCurrent() {
    const { state } = useContext(GlobalContext);
    const { animeList, setAnimeList } = state;

    useEffect(() => {
        axios
            .get('https://api.jikan.moe/v4/seasons/now')
            .then((response) => {
                setAnimeList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setAnimeList]);

    return (
        <section className='flex flex-col items-center gap-5 md:items-start'>
            <h2 className='mb-5 text-lg font-semibold'>Ongoing</h2>
            <div className='flex flex-wrap justify-center gap-4 md:justify-start'>
                {animeList &&
                    animeList
                        .filter((anime) => {
                            return anime.airing === true;
                        })
                        .slice(0, 10)
                        .map((anime) => {
                            const { title, mal_id } = anime;
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
                                        className='h-52 w-36 md:h-40 md:w-32'
                                    />
                                    <p className='absolute -bottom-[4.4rem] left-0 h-28 w-40 bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] text-white transition-all duration-300 group-hover:bottom-0 md:w-32'>
                                        {title}
                                    </p>
                                </Link>
                            );
                        })}
            </div>
            <div className='mt-3 flex justify-end'>
                <button className='cursor-pointer text-xs transition-all duration-200 hover:text-rose-500'>
                    <Link to={'/ongoing-anime'}>View More</Link>
                </button>
            </div>
        </section>
    );
}

export default HomeCurrent;
