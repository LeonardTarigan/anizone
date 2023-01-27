import React from 'react';

function Pagination(props) {
    return (
        <div className='mt-10 flex w-full items-center justify-center gap-5 text-sm'>
            <button
                onClick={props.handlePrev}
                className={`flex cursor-pointer p-2 ${
                    props.current <= 1
                        ? 'cursor-not-allowed text-zinc-400'
                        : 'hover:text-rose-500'
                }`}
            >
                {'<'} Prev
            </button>
            <div className='rounded-md bg-rose-500 p-2 font-semibold'>
                <span>{props.current}</span> /{' '}
                <span onClick={props.handleMax} className='cursor-pointer'>
                    {props.max}
                </span>
            </div>
            <button
                onClick={props.handleNext}
                className={`flex cursor-pointer p-2 ${
                    props.current === props.max
                        ? 'cursor-not-allowed text-zinc-400'
                        : 'hover:text-rose-500'
                }`}
            >
                Next {'>'}
            </button>
        </div>
    );
}

export default Pagination;
