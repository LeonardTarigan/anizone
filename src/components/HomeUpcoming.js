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
        <section>
            <div className='mb-7 flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Upcoming</h2>

                <button className='cursor-pointer text-xs transition-all duration-200 hover:text-rose-500'>
                    <Link to={'/upcoming-anime'}>View More</Link>
                </button>
            </div>
            <div className='flex flex-wrap gap-4'>
                {upcomingList &&
                    upcomingList.slice(0, 10).map((anime) => {
                        const { title, mal_id } = anime;
                        const { large_image_url } = anime.images.jpg;

                        return (
                            <div
                                key={mal_id}
                                className='group relative h-fit w-fit cursor-pointer overflow-hidden bg-zinc-100'
                            >
                                <img
                                    src={large_image_url}
                                    alt={title}
                                    className='h-40 w-32'
                                />
                                <p className='absolute -bottom-[4.4rem] left-0 h-28 w-32 bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] text-white transition-all duration-300 group-hover:bottom-0'>
                                    {title}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}

export default HomeUpcoming;
