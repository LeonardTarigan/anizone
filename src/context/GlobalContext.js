import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

function GlobalProvider(props) {
    const [loading, setLoading] = useState(false);
    const [animeDetail, setAnimeDetail] = useState();
    const [animeList, setAnimeList] = useState();
    const [upcomingList, setUpcomingList] = useState();
    const [topList, setTopList] = useState();
    const [currentPage, setCurrentPage] = useState('home');

    let state = {
        loading,
        setLoading,
        animeList,
        setAnimeList,
        upcomingList,
        setUpcomingList,
        currentPage,
        setCurrentPage,
        topList,
        setTopList,
        animeDetail,
        setAnimeDetail,
    };

    return (
        <>
            <GlobalContext.Provider value={{ state }}>
                {props.children}
            </GlobalContext.Provider>
        </>
    );
}

export default GlobalProvider;
