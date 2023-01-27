import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopAside() {
    const { state } = useContext(GlobalContext);
    const { topFive, setTopFive } = state;

    useEffect(() => {
        if (topFive === undefined) {
            axios
                .get('https://api.jikan.moe/v4/top/anime')
                .then((response) => {
                    setTopFive(response.data.data.slice(0, 5));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setTopFive, topFive]);

    return (
        <aside className='hidden h-fit w-full basis-1/3 flex-col items-center overflow-hidden rounded-md bg-zinc-800 md:flex'>
            <div className='w-ful py-3 text-center font-bold'>
                <Link to={'/top-anime'}>Current Rank</Link>
            </div>
            <ul className='flex w-full flex-col'>
                {topFive &&
                    topFive.slice(0, 5).map((anime, index) => {
                        const { title, mal_id, episodes, score, genres } =
                            anime;
                        const { large_image_url } = anime.images.jpg;

                        let genreList = genres.map((result) => {
                            return result.name;
                        });

                        return (
                            <li
                                key={mal_id}
                                className={`flex gap-3 ${
                                    (index + 1) % 2 === 0
                                        ? 'bg-zinc-800'
                                        : 'bg-zinc-700'
                                } px-4 py-5`}
                            >
                                <p className='text-sm'>{index + 1}</p>
                                <img
                                    src={large_image_url}
                                    className='h-28 w-20 rounded-sm bg-white'
                                    alt={title}
                                />
                                <div className='flex flex-col justify-between'>
                                    <div className='flex flex-col gap-2'>
                                        <h4 className='text-xs font-bold'>
                                            {title}
                                        </h4>
                                        <div className='text-[0.65rem] text-zinc-400'>
                                            <p>{episodes} Episodes</p>
                                            <p>{genreList.join(', ')}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-1 text-[0.65rem]'>
                                        <svg
                                            className='h-4 w-4 fill-yellow-500'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                        </svg>{' '}
                                        {score}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </aside>
    );
}

export default TopAside;
