import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';

function TopAnime() {
    const { state } = useContext(GlobalContext);
    const { topList, setTopList, setLoading, setCurrentPage } = state;

    useEffect(() => {
        setCurrentPage('top');

        if (topList === undefined) {
            setLoading(true);
            axios
                .get('https://api.jikan.moe/v4/seasons/upcoming')
                .then((response) => {
                    setTopList(response.data.data);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setLoading, setTopList, setCurrentPage, topList]);

    return (
        <section className='px-5 py-10 md:px-20'>
            <h2 className='mb-7 text-lg font-semibold'>Top Anime List</h2>
            <div className='flex flex-wrap gap-5'>
                {topList &&
                    topList.map((anime, index) => {
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
                                    className='h-56 w-40'
                                />
                                <p className='absolute -bottom-[4.3rem] left-0 h-24 w-40 bg-zinc-900 bg-opacity-80 p-2 text-[0.65rem] text-white transition-all duration-300 group-hover:bottom-0'>
                                    {title}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}

export default TopAnime;
