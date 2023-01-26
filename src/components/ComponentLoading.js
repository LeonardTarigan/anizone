import React from 'react';
import { HashLoader } from 'react-spinners';

function ComponentLoading() {
    return (
        <div className='flex h-[25rem] w-full items-center justify-center place-self-center'>
            <HashLoader color='#f4f4f5' />
        </div>
    );
}

export default ComponentLoading;
