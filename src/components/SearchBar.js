import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function SearchBar() {
    const { state, handler } = useContext(GlobalContext);
    const { search } = state;
    const { handleSearch, handleInputChange } = handler;

    return (
        <form
            onSubmit={handleSearch}
            className='mt-2 flex items-center justify-between bg-zinc-100 md:mt-0'
        >
            <input
                type='text'
                placeholder='Search Anime'
                value={search}
                onChange={handleInputChange}
                className='w-64 bg-zinc-100 p-2 text-xs text-zinc-900 focus:outline-none'
            />
            <button type='submit'>
                <svg
                    className='mr-2 h-6 w-6 fill-zinc-900'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        clipRule='evenodd'
                    />
                </svg>
            </button>
        </form>
    );
}

export default SearchBar;
