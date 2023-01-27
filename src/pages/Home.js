import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import HomeCurrent from '../components/HomeCurrent';
import HomeUpcoming from '../components/HomeUpcoming';
import TopAside from '../components/TopAside';

function Home() {
    const { state } = useContext(GlobalContext);
    const { setCurrentPage, setLoading, animeList, upcomingList, topFive } =
        state;

    useEffect(() => {
        setLoading(true);

        setCurrentPage('home');

        if (
            animeList !== undefined &&
            upcomingList !== undefined &&
            topFive !== undefined
        )
            setLoading(false);
    }, [setLoading, setCurrentPage, animeList, upcomingList, topFive]);

    return (
        <div className='flex gap-10 px-5 py-10 md:px-20'>
            <div className='flex flex-col gap-20 md:basis-2/3 md:gap-12'>
                <HomeCurrent />
                <HomeUpcoming />
            </div>
            <TopAside />
        </div>
    );
}

export default Home;
