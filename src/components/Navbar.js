import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Navbar() {
    const { state } = useContext(GlobalContext);
    const { currentPage } = state;

    const menus = [
        { link: '/', title: 'Home', pageName: 'home' },
        { link: '/ongoing-anime', title: 'Ongoing', pageName: 'ongoing-anime' },
        {
            link: '/upcoming-anime',
            title: 'Upcoming',
            pageName: 'upcoming-anime',
        },
        { link: '/top-anime', title: 'Top Anime', pageName: 'top-anime' },
        { link: '/genres', title: 'Genres', pageName: 'genres' },
    ];

    return (
        <>
            <header className='w-full'>
                <div className='flex w-full cursor-pointer justify-center py-5 md:w-fit md:justify-start md:px-20'>
                    <Link to={'/'}>
                        <h1 className='text-4xl font-bold'>
                            Ani<span className='text-rose-500'>Zone</span>
                        </h1>
                        <p className='text-xs font-extrabold tracking-wider'>
                            ア ニ ゾ ン
                        </p>
                    </Link>
                </div>
            </header>
            <nav className='top-0 z-10 flex flex-col-reverse gap-2 overflow-hidden border-b-4 border-rose-500 bg-zinc-800 px-5 text-zinc-100 md:px-20 lg:sticky lg:flex-row lg:justify-between'>
                <ul className='flex flex-wrap  whitespace-nowrap text-sm font-semibold md:justify-start'>
                    {menus.map((result, index) => {
                        return (
                            <Link
                                key={index}
                                to={result.link}
                                className='basis-1/2 cursor-pointer md:basis-0'
                            >
                                <li
                                    className={`py-2 px-3 hover:bg-rose-500 hover:text-zinc-100 md:basis-0 ${
                                        currentPage === result.pageName
                                            ? 'bg-rose-500 text-zinc-100'
                                            : ''
                                    }`}
                                >
                                    {result.title}
                                </li>
                            </Link>
                        );
                    })}
                </ul>

                <SearchBar />
            </nav>
        </>
    );
}

export default Navbar;
