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
                // console.log(data);

                setCharacterList(
                    data.map((result) => {
                        return {
                            id: result.character.mal_id,
                            name: result.character.name,
                            image: result.character.images.jpg.image_url,
                            role: result.role,
                            seiyuu: `${
                                result.voice_actors[0] === undefined
                                    ? '-'
                                    : `${result.voice_actors[0].person.name}`
                            }`,
                        };
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [animeId]);

    // console.log(characterList);

    return (
        <>
            {characterList !== undefined && (
                <div>
                    <h5 className='text-sm font-semibold'>Characters</h5>
                    <div className='my-2 h-px w-full bg-zinc-500'></div>
                    <div className='flex flex-wrap gap-5'>
                        {characterList &&
                            characterList.map((character) => {
                                return (
                                    <Link
                                        key={character.id}
                                        to={`/anime/character/${
                                            character.id
                                        }/${character.name
                                            .split(' ')
                                            .join('')}`}
                                        className='flex w-full gap-3 overflow-hidden rounded-md bg-zinc-800 sm:w-[16rem]'
                                    >
                                        <img
                                            src={character.image}
                                            alt={character.name}
                                            className='h-28 w-20'
                                        />
                                        <div className='flex flex-col justify-between py-2'>
                                            <div>
                                                <h5 className='text-sm font-bold'>
                                                    {character.name}
                                                </h5>
                                                <p className='text-xs text-zinc-400'>
                                                    {character.role}
                                                </p>
                                            </div>
                                            <p className='text-xs text-zinc-400'>
                                                Seiyuu : {character.seiyuu}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Characters;
