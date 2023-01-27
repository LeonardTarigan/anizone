import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GenreContext } from '../context/GenreContext';
import { GlobalContext } from '../context/GlobalContext';
import AnimeByGenre from '../components/AnimeByGenre';
import axios from 'axios';

function Genres() {
    const { state } = useContext(GlobalContext);
    const { genreState } = useContext(GenreContext);
    const { setCurrentPage, genreList, setGenreList, fetchStatus, setLoading } =
        state;
    const { currentGenre, handleGenreSearch } = genreState;

    useEffect(() => {
        setCurrentPage('genres');

        if (genreList === undefined) {
            setLoading(true);
            axios
                .get(`https://api.jikan.moe/v4/genres/anime?filter=genres`)
                .then((response) => {
                    setGenreList(response.data.data);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setCurrentPage, genreList, fetchStatus, setGenreList, setLoading]);

    return (
        <section className='flex h-fit min-h-[25rem] flex-col items-center justify-between gap-7 px-5 py-10 md:items-start md:px-20'>
            <div className='flex flex-wrap gap-5 text-sm'>
                {genreList !== undefined &&
                    genreList.map((genre) => {
                        return (
                            <div
                                key={genre.mal_id}
                                onClick={() => {
                                    handleGenreSearch(genre.mal_id, genre.name);
                                }}
                                className={`cursor-pointer rounded-md  py-2 px-4 transition-all duration-200 hover:bg-rose-500 ${
                                    currentGenre.name === genre.name
                                        ? 'bg-rose-500'
                                        : 'bg-zinc-800'
                                }`}
                            >
                                {genre.name}
                            </div>
                        );
                    })}
            </div>
            <AnimeByGenre />
        </section>
    );
}

export default Genres;
