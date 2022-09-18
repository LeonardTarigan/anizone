import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export const TopAnimeContext = createContext();

function TopAnimeProvider(props) {
    const { state } = useContext(GlobalContext);
    const { setFetchStatus } = state;
    const [componentLoading, setComponentLoading] = useState(false);
    const [pagination, setPagination] = useState(1);
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

    let topAnimeState = {
        componentLoading,
        setComponentLoading,
        pagination,
        setPagination,
        maxPagination,
        setMaxPagination,
        handlePagination,
        animeByGenre,
        setAnimeByGenre,
    };
    return (
        <TopAnimeContext.Provider value={{ topAnimeState }}>
            {props.children}
        </TopAnimeContext.Provider>
    );
}

export default TopAnimeProvider;
