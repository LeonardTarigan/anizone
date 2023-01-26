import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export const GenreContext = createContext();

function GenreProvider(props) {
    const { state } = useContext(GlobalContext);
    const { setFetchStatus } = state;

    const [currentGenre, setCurrentGenre] = useState({ id: '', name: '' });
    const [componentLoading, setComponentLoading] = useState(false);
    const [pagination, setPagination] = useState(0);
    const [maxPagination, setMaxPagination] = useState(0);
    const [animeByGenre, setAnimeByGenre] = useState();

    const handlePagination = (action) => {
        if (action === 'next') {
            if (pagination < maxPagination) {
                setPagination(pagination + 1);
                setFetchStatus(true);
            }
        } else if (action === 'prev') {
            if (pagination !== 1) {
                setPagination(pagination - 1);
                setFetchStatus(true);
            }
        } else if (action === 'max') {
            setPagination(maxPagination);
            setFetchStatus(true);
        }
    };

    const handleGenreSearch = (id, name) => {
        setPagination(1);

        setCurrentGenre({
            id: id,
            name: name,
        });

        setFetchStatus(true);
    };

    let genreState = {
        componentLoading,
        setComponentLoading,
        pagination,
        setPagination,
        maxPagination,
        setMaxPagination,
        handlePagination,
        handleGenreSearch,
        currentGenre,
        setCurrentGenre,
        animeByGenre,
        setAnimeByGenre,
    };

    return (
        <GenreContext.Provider value={{ genreState }}>
            {props.children}
        </GenreContext.Provider>
    );
}

export default GenreProvider;
