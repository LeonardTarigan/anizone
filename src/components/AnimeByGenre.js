import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { GenreContext } from '../context/GenreContext';
import Pagination from './Pagination';
import axios from 'axios';
import ComponentLoading from './ComponentLoading';

function AnimeByGenre() {
    const { state } = useContext(GlobalContext);
    const { genreState } = useContext(GenreContext);
    const { fetchStatus, setFetchStatus } = state;
    const {
        componentLoading,
        setComponentLoading,
        pagination,
        setPagination,
        maxPagination,
        setMaxPagination,
        handlePagination,
        animeByGenre,
        setAnimeByGenre,
        currentGenre,
    } = genreState;

    useEffect(() => {
        if (
            (animeByGenre === undefined && currentGenre === undefined) ||
            fetchStatus === true
        ) {
            setComponentLoading(true);
            axios
                .get(
                    `https://api.jikan.moe/v4/anime?page=${pagination}&genres=${currentGenre.id}&order_by=score&sort=desc&sfw=true`
                )
                .then((response) => {
                    setAnimeByGenre(response.data.data);
                    setMaxPagination(
                        response.data.pagination.last_visible_page
                    );
                    setFetchStatus(false);
                    setComponentLoading(false);
                });
        }
    }, [
        setAnimeByGenre,
        setFetchStatus,
        fetchStatus,
        currentGenre.id,
        animeByGenre,
        currentGenre,
        pagination,
        setComponentLoading,
        setMaxPagination,
        setPagination,
    ]);

    return (
        <div className='flex w-full flex-wrap gap-5'>
            {componentLoading && <ComponentLoading />}

            <div className='grid w-full grid-cols-2 place-items-center gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
                {animeByGenre &&
                    componentLoading === false &&
                    animeByGenre.map((anime) => {
                        const { title, mal_id, score } = anime;
                        const { large_image_url } = anime.images.jpg;

                        return (
                            <Link
                                key={mal_id}
                                to={`/anime/${mal_id}/${title
                                    .split(' ')
                                    .join('_')}`}
                                className='group relative aspect-[3/4] h-fit w-fit cursor-pointer overflow-hidden rounded-md bg-zinc-100'
                            >
                                <img
                                    src={large_image_url}
                                    alt={title}
                                    className='h-full w-full object-cover'
                                />
                                <div className='absolute -bottom-[3.2rem] left-0 h-24 w-full bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] leading-relaxed text-white transition-all duration-300 group-hover:bottom-0'>
                                    <div className='flex items-center gap-1'>
                                        <svg
                                            className='h-4 w-4 fill-yellow-500'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                        </svg>
                                        <p className='font-semibold'>{score}</p>
                                    </div>
                                    <p>{title}</p>
                                </div>
                            </Link>
                        );
                    })}
            </div>
            <Pagination
                current={pagination}
                max={maxPagination}
                handleNext={() => handlePagination('next')}
                handlePrev={() => handlePagination('prev')}
                handleMax={() => handlePagination('max')}
            />
        </div>
    );
}

export default AnimeByGenre;
