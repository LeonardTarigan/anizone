import React from 'react';

function Pagination(props) {
    return (
        <div className='mt-10 flex w-full justify-center gap-5 text-sm'>
            <button
                onClick={props.handlePrev}
                className={`flex cursor-pointer ${
                    props.current <= 1 ? 'text-zinc-400' : ''
                }`}
            >
                {'<'} Prev
            </button>
            <div>
                <span>{props.current}</span> /{' '}
                <span onClick={props.handleMax} className='cursor-pointer'>
                    {props.max}
                </span>
            </div>
            <button
                onClick={props.handleNext}
                className={`flex cursor-pointer ${
                    props.current === props.max ? 'text-zinc-400' : ''
                }`}
            >
                Next {'>'}
            </button>
        </div>
    );
}

export default Pagination;
