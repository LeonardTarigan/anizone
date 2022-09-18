import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeUpcoming() {
    const { state } = useContext(GlobalContext);
    const { upcomingList, setUpcomingList } = state;

    useEffect(() => {
        axios
            .get('https://api.jikan.moe/v4/seasons/upcoming')
            .then((response) => {
                setUpcomingList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setUpcomingList]);

    return (
        <section className='flex flex-col items-center gap-5 md:items-start'>
            <h2 className='text-lg font-semibold'>Upcoming</h2>
            <div className='flex flex-wrap justify-center gap-4 md:justify-start'>
                {upcomingList &&
                    upcomingList.slice(0, 10).map((anime) => {
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
            <div className='mt-3 flex w-full justify-center md:justify-end'>
                <button className='cursor-pointer text-xs transition-all duration-200 hover:text-rose-500'>
                    <Link
                        to={'/upcoming-anime'}
                        className='group flex items-center gap-1'
                    >
                        <div>View More</div>
                        <svg
                            className='h-4 w-5 transition-all duration-200 group-hover:translate-x-1'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </Link>
                </button>
            </div>
        </section>
    );
}

export default HomeUpcoming;
