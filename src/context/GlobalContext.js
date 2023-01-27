import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const GlobalContext = createContext();

function GlobalProvider(props) {
    const [loading, setLoading] = useState(false);
    const [fetchStatus, setFetchStatus] = useState(false);
    const [animeDetail, setAnimeDetail] = useState();
    const [animeList, setAnimeList] = useState();
    const [upcomingList, setUpcomingList] = useState();
    const [topList, setTopList] = useState();
    const [topFive, setTopFive] = useState();
    const [animeByGenre, setAnimeByGenre] = useState();
    const [genreList, setGenreList] = useState();
    const [currentPage, setCurrentPage] = useState('home');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState();
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();

        setLoading(true);

        axios
            .get(`https://api.jikan.moe/v4/anime?q=${search}&sfw=true`)
            .then((response) => {
                const data = response.data.data;

                setSearchResult(
                    data.filter((result) => {
                        return (
                            result.approved === true && result.score !== null
                        );
                    })
                );

                navigate(`/anime/search/${search.split(' ').join('+')}`);
                setLoading(false);
                setCurrentPage('');
            });
    };

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    let handler = {
        handleSearch,
        handleInputChange,
    };

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
        topFive,
        setTopFive,
        animeDetail,
        setAnimeDetail,
        search,
        setSearch,
        searchResult,
        setSearchResult,
        genreList,
        setGenreList,
        fetchStatus,
        setFetchStatus,
        animeByGenre,
        setAnimeByGenre,
    };

    return (
        <>
            <GlobalContext.Provider value={{ state, handler }}>
                {props.children}
            </GlobalContext.Provider>
        </>
    );
}

export default GlobalProvider;
