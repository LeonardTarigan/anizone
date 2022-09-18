import React, { useContext } from 'react';
import { HashLoader } from 'react-spinners';
import { GlobalContext } from '../context/GlobalContext';

function Loading() {
    const { state } = useContext(GlobalContext);
    const { loading } = state;

    return (
        <>
            {loading ? (
                <div className='fixed z-20 flex h-screen w-full flex-col items-center justify-center gap-12 bg-zinc-900'>
                    <p className='text-[3rem] font-bold'>
                        Ani<span className='text-rose-500'>Zone</span>
                    </p>
                    <HashLoader color='#f4f4f5' />
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default Loading;
