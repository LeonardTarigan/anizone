import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';

function CharacterDetail() {
    let { characterId } = useParams();
    const { state } = useContext(GlobalContext);
    const { setLoading } = state;
    const [characterDetail, setCharacterDetail] = useState();

    useEffect(() => {
        setLoading(true);

        if (characterId !== undefined) {
            axios
                .get(`https://api.jikan.moe/v4/characters/${characterId}/full`)
                .then((response) => {
                    let data = response.data.data;

                    setCharacterDetail({
                        id: data.mal_id,
                        name: data.name,
                        kanji: data.name_kanji,
                        about: data.about,
                        image: data.images.jpg.image_url,
                        voices: data.voices.map((result) => {
                            return {
                                id: result.person.mal_id,
                                language: result.language,
                                name: result.person.name,
                                image: result.person.images.jpg.image_url,
                            };
                        }),
                    });

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setLoading, characterId, setCharacterDetail]);

    console.log(characterDetail);

    return (
        <>
            {characterDetail && (
                <section className='flex flex-col gap-5 px-5 py-10 md:px-20 lg:flex-row'>
                    <img
                        src={characterDetail.image}
                        alt={characterDetail.name}
                        className='h-52 w-36 rounded-md md:h-60 md:w-52'
                    />

                    <div className='flex flex-col gap-7'>
                        <div>
                            <h3 className='text-2xl font-bold'>
                                {characterDetail.name}
                            </h3>
                            <p>{characterDetail.kanji}</p>
                        </div>

                        <div>
                            <h5 className='text-sm font-semibold'>About</h5>
                            <div className='my-2 h-px w-full bg-zinc-500'></div>
                            {characterDetail.about !== null ? (
                                <p className='text-xs'>
                                    {characterDetail.about}
                                </p>
                            ) : (
                                <i className='text-xs text-zinc-400'>No data</i>
                            )}
                        </div>

                        <div>
                            <h5 className='text-sm font-semibold'>
                                Voice Actors
                            </h5>
                            <div className='my-2 h-px w-full bg-zinc-500'></div>
                            {characterDetail.voices.length > 0 ? (
                                <div className='flex flex-wrap gap-5'>
                                    {characterDetail.voices.map((actor) => {
                                        return (
                                            <div
                                                key={actor.id}
                                                className='flex w-full gap-3 overflow-hidden rounded-md bg-zinc-800 sm:w-[17rem]'
                                            >
                                                <img
                                                    src={actor.image}
                                                    alt={actor.name}
                                                    className='h-28 w-20'
                                                />
                                                <div className='flex flex-col justify-between py-2'>
                                                    <div>
                                                        <h5 className='text-sm font-bold'>
                                                            {actor.name
                                                                .split(', ')
                                                                .join(' ')}
                                                        </h5>
                                                        <p className='text-xs text-zinc-400'>
                                                            {actor.language}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <i className='text-xs text-zinc-400'>No data</i>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default CharacterDetail;
