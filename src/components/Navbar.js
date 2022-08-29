import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const { state } = useContext(GlobalContext);
    const { currentPage } = state;

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
            <nav className='sticky top-0 z-10 border-b-4 border-rose-500 bg-zinc-800 px-5 text-zinc-100 md:px-20'>
                <ul className='flex flex-wrap justify-center whitespace-nowrap text-sm font-semibold md:justify-start'>
                    <li
                        className={`cursor-pointer py-2 px-3 hover:bg-rose-500 hover:text-zinc-100 ${
                            currentPage === 'home'
                                ? 'bg-rose-500 text-zinc-100'
                                : ''
                        }`}
                    >
                        <Link to={'/'}>Home</Link>
                    </li>
                    {/* <li
                        className={`cursor-pointer py-2 px-3 hover:bg-rose-500 hover:text-zinc-100 ${
                            currentPage === 'genre'
                                ? 'bg-rose-500 text-zinc-100'
                                : ''
                        }`}
                    >
                        Genre
                    </li> */}
                    <li
                        className={`cursor-pointer py-2 px-3 hover:bg-rose-500 hover:text-zinc-100 ${
                            currentPage === 'on-going'
                                ? 'bg-rose-500 text-zinc-100'
                                : ''
                        }`}
                    >
                        <Link to={'/on-going-anime'}>On-Going</Link>
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-3 hover:bg-rose-500 hover:text-zinc-100 ${
                            currentPage === 'upcoming'
                                ? 'bg-rose-500 text-zinc-100'
                                : ''
                        }`}
                    >
                        <Link to={'/upcoming-anime'}>Upcoming</Link>
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-3 hover:bg-rose-500 hover:text-zinc-100 ${
                            currentPage === 'top'
                                ? 'bg-rose-500 text-zinc-100'
                                : ''
                        }`}
                    >
                        <Link to={'/top-anime'}>Top Anime</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
