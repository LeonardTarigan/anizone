import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Characters() {
    let { animeId } = useParams();
    const [characterList, setCharacterList] = useState();

    useEffect(() => {
        axios
            .get(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
            .then((response) => {
                const data = response.data.data;

                setCharacterList(
                    data.map((result) => {
                        let va;

                        if (result.voice_actors.length !== 0) {
                            result.voice_actors = result.voice_actors.filter(
                                (va) => {
                                    return va.language === 'Japanese';
                                }
                            )[0];
                        }

                        result.voice_actors === undefined ||
                        result.voice_actors.length === 0
                            ? (va = '-')
                            : (va = result.voice_actors.person.name);

                        return {
                            id: result.character.mal_id,
                            name: result.character.name,
                            image: result.character.images.jpg.image_url,
                            role: result.role,
                            seiyuu: va,
                        };
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [animeId]);

    return (
        <>
            <div>
                <h5 className='text-sm font-semibold'>Characters</h5>
                <div className='my-2 h-px w-full bg-zinc-500'></div>
                {characterList === undefined || characterList.length <= 0 ? (
                    <i className='text-xs text-zinc-400'>No data</i>
                ) : (
                    <div className='flex flex-wrap gap-5'>
                        {characterList &&
                            characterList.map((character) => {
                                return (
                                    <Link
                                        key={character.id}
                                        to={`/anime/character/${
                                            character.id
                                        }/${character.name
                                            .split(/[,\s]/)
                                            .join('_')}`}
                                        className='flex w-full gap-3 overflow-hidden rounded-md border-2 border-zinc-900 bg-zinc-800 hover:border-rose-500 sm:w-[16rem]'
                                    >
                                        <img
                                            src={character.image}
                                            alt={character.name}
                                            className='h-28 w-20'
                                        />
                                        <div className='flex flex-col justify-between py-2 pr-1'>
                                            <div>
                                                <h5 className='text-sm font-bold'>
                                                    {character.name
                                                        .split(', ')
                                                        .join(' ')}
                                                </h5>
                                                <p className='text-xs text-zinc-400'>
                                                    {character.role}
                                                </p>
                                            </div>
                                            <p className='text-xs text-zinc-400'>
                                                Seiyuu :{' '}
                                                {character.seiyuu
                                                    .split(', ')
                                                    .join(' ')}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                )}
            </div>
        </>
    );
}

export default Characters;
