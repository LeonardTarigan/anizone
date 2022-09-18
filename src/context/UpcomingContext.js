import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export const UpcomingContext = createContext();

function UpcomingProvider(props) {
    const { state } = useContext(GlobalContext);
    const { setFetchStatus } = state;

    const [componentLoading, setComponentLoading] = useState(false);
    const [pagination, setPagination] = useState(1);
    const [maxPagination, setMaxPagination] = useState(0);

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

    let upcomingState = {
        componentLoading,
        setComponentLoading,
        pagination,
        setPagination,
        maxPagination,
        setMaxPagination,
        handlePagination,
    };
    return (
        <UpcomingContext.Provider value={{ upcomingState }}>
            {props.children}
        </UpcomingContext.Provider>
    );
}

export default UpcomingProvider;
