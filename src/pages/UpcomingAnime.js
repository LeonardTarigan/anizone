import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UpcomingAnime() {
    const { state } = useContext(GlobalContext);
    const { upcomingList, setUpcomingList, setLoading, setCurrentPage } = state;

    useEffect(() => {
        setCurrentPage('upcoming-anime');

        if (upcomingList === undefined) {
            setLoading(true);
            axios
                .get('https://api.jikan.moe/v4/seasons/upcoming')
                .then((response) => {
                    setUpcomingList(response.data.data);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setLoading, setUpcomingList, setCurrentPage, upcomingList]);

    return (
        <section className='flex flex-col items-center px-5 py-10 md:items-start md:px-20'>
            <h2 className='mb-7 text-lg font-semibold'>Upcoming Anime List</h2>
            <div className='flex flex-wrap justify-center gap-5 md:justify-start'>
                {upcomingList &&
                    upcomingList.map((anime) => {
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

export default UpcomingAnime;
