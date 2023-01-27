import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import ReactPlayer from 'react-player/youtube';
import Characters from '../components/Characters';
import axios from 'axios';

function AnimeDetail() {
    let { animeId } = useParams();
    const { state } = useContext(GlobalContext);
    const { setLoading } = state;
    const [animeDetail, setAnimeDetail, setCurrentPage] = useState();

    useEffect(() => {
        setLoading(true);

        if (animeId !== undefined) {
            axios
                .get(`https://api.jikan.moe/v4/anime/${animeId}`)
                .then((response) => {
                    let data = response.data.data;
                    console.log(data);

                    setAnimeDetail({
                        airing: data.airing,
                        title: data.title,
                        title_japanese: data.title_japanese,
                        synopsis: data.synopsis,
                        type: data.type,
                        score: data.score,
                        duration: data.duration,
                        image: data.images.jpg.large_image_url,
                        trailer: data.trailer.embed_url,
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
    }, [animeId, setAnimeDetail, setLoading, setCurrentPage]);

    return (
        <>
            {animeDetail !== undefined && (
                <section className='flex flex-col gap-5 px-5 py-10 md:px-20 lg:flex-row'>
                    <div className='flex w-full flex-col gap-10'>
                        <div className='flex flex-col gap-5 sm:flex-row'>
                            <img
                                src={animeDetail.image}
                                alt={animeDetail.title}
                                className='h-56 w-44 rounded-md md:h-60 md:w-44'
                            />
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <h3 className='text-2xl font-bold'>
                                        {animeDetail.title}
                                    </h3>
                                    <p>{animeDetail.title_japanese}</p>
                                </div>

                                {animeDetail.score !== null && (
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <svg
                                            className='h-4 w-4 fill-yellow-500'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                        </svg>
                                        <p>{animeDetail.score}</p>
                                    </div>
                                )}

                                <ul className='flex flex-col gap-1 text-xs'>
                                    <li>
                                        Type :{' '}
                                        {animeDetail.type || (
                                            <i className='text-xs text-zinc-400'>
                                                Unknown
                                            </i>
                                        )}
                                    </li>
                                    <li>
                                        Episodes :{' '}
                                        {animeDetail.episodes || (
                                            <i className='text-xs text-zinc-400'>
                                                Unknown
                                            </i>
                                        )}
                                    </li>
                                    <li>
                                        Duration :{' '}
                                        {(animeDetail.duration &&
                                            animeDetail.duration !==
                                                'Unknown') || (
                                            <i className='text-xs text-zinc-400'>
                                                Unknown
                                            </i>
                                        )}{' '}
                                    </li>
                                    <li>
                                        Source :{' '}
                                        {animeDetail.source || (
                                            <i className='text-xs text-zinc-400'>
                                                Unknown
                                            </i>
                                        )}
                                    </li>
                                    <li>
                                        Rating :{' '}
                                        {animeDetail.rating || (
                                            <i className='text-xs text-zinc-400'>
                                                Unknown
                                            </i>
                                        )}
                                    </li>
                                    <li>
                                        Genre :{' '}
                                        {animeDetail.genres.join(', ') || (
                                            <i className='text-xs text-zinc-400'>
                                                Unknown
                                            </i>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {animeDetail.score !== null && (
                            <div
                                className={`${
                                    animeDetail.airing === true
                                        ? 'bg-rose-500'
                                        : 'bg-zinc-700'
                                } rounded-sm py-1 text-center text-xs font-semibold`}
                            >
                                {animeDetail.airing === true ? (
                                    <div className='flex items-center justify-center gap-1'>
                                        <svg
                                            className='h-4 w-4'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                        <p>Airing</p>
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center gap-1'>
                                        <svg
                                            className='h-4 w-4'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                        <p>Completed</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div>
                            <h5 className='text-sm font-semibold'>Synopsis</h5>
                            <div className='my-2 h-px w-full bg-zinc-500'></div>
                            {animeDetail.synopsis !== null ? (
                                <p className='text-xs'>
                                    {animeDetail.synopsis}
                                </p>
                            ) : (
                                <i className='text-xs text-zinc-400'>No data</i>
                            )}
                        </div>

                        <div>
                            <h5 className='text-sm font-semibold'>Trailer</h5>
                            <div className='my-2 h-px w-full bg-zinc-500'></div>
                            {animeDetail.trailer !== null ? (
                                <div className='relative aspect-video overflow-hidden rounded-lg md:w-3/5'>
                                    <ReactPlayer
                                        url={animeDetail.trailer}
                                        controls
                                        width='100%'
                                        height='100%'
                                        loop
                                        key={'youtube'}
                                        className='absolute top-0 left-0'
                                    />
                                </div>
                            ) : (
                                <i className='text-xs text-zinc-400'>
                                    Unavailable
                                </i>
                            )}
                        </div>

                        <Characters />
                    </div>
                </section>
            )}
        </>
    );
}

export default AnimeDetail;
