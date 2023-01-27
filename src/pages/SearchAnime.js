import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function SearchAnime() {
    const { query } = useParams();
    const { state } = useContext(GlobalContext);
    const { setSearch, searchResult, setSearchResult, setLoading } = state;

    useEffect(() => {
        if (searchResult === undefined) {
            setLoading(true);
            setSearch(query.split('+').join(' '));

            axios
                .get(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true`)
                .then((response) => {
                    const data = response.data.data;
                    setSearchResult(
                        data.filter((result) => {
                            return (
                                result.approved === true &&
                                result.score !== null
                            );
                        })
                    );
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [query, setSearch, searchResult, setSearchResult, setLoading]);

    return (
        <>
            {searchResult && (
                <section className='flex h-fit min-h-[30rem] flex-col items-center px-5 py-10 md:items-start md:px-20'>
                    {searchResult.length === 0 ? (
                        <div className='flex w-full flex-col items-center justify-center gap-10 py-10'>
                            <img
                                src={require('../img/anime-pout.png')}
                                alt='pouting-anime'
                                className='mr-5 contrast-125'
                            />
                            <p className='text-xl font-semibold'>
                                No result ...
                            </p>
                        </div>
                    ) : (
                        <div className='grid w-full grid-cols-2 place-items-center gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
                            {searchResult &&
                                searchResult.map((anime) => {
                                    const { title, mal_id, score } = anime;
                                    const { large_image_url } =
                                        anime.images.jpg;

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
                                            <div className='absolute -bottom-[3.32rem] left-0 h-24 w-full bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] text-white transition-all duration-300 group-hover:bottom-0'>
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
                    )}
                </section>
            )}
        </>
    );
}

export default SearchAnime;
