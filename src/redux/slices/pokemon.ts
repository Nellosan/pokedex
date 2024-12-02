import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Pokemon from '../../types/pokemon.type';

interface PokemonState {
    list: Pokemon[]
    status: 'idle' | 'fetching' | 'success' | 'error'
    error?: string
};

const initialState: PokemonState = {
    list: [],
    status: 'idle'
};

interface PokemonApi {
    id: number
    name: string
    order: number
    height: number
    weight: number
    stats: Array<{
        base_stat: number
        effort: number
        stat: {
            name: string
            url: string
        }
    }>
    types: Array<{
        slot: number
        type: {
            name: string
            url: string
        }
    }>
    cries: {
        latest: string
        legacy: string
    }
    sprites: {
        back_default: string
        front_default: string
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
}

const mapPokemonData = (data: PokemonApi): Pokemon => {
    return {
        id: data.id,
        name: data.name,
        order: data.order,
        height: data.height,
        weight: data.weight,
        stats: data.stats.map(statInfo => ({
            base_stat: statInfo.base_stat,
            effort: statInfo.effort,
            name: statInfo.stat.name,
        })),
        types: data.types.map(typeInfo => ({
            slot: typeInfo.slot,
            name: typeInfo.type.name,
        })),
        cries: {
            latest: data.cries?.latest || '',
            legacy: data.cries?.legacy || '',
        },
        sprites: {
            back: data.sprites.back_default,
            front: data.sprites.front_default,
            official_artwork: data.sprites.other['official-artwork']?.front_default || '',
        },
        };
    };

export const fetchPokemons = createAsyncThunk('pokemon/fetchAll', async () => {
    const response = await axios.get<{ results: { url: string }[] }>('https://pokeapi.co/api/v2/pokemon?limit=151');
    const results = await Promise.all(
        response.data.results.map(async pokemon => {
            const { data } = await axios.get<PokemonApi>(pokemon.url);
            return mapPokemonData(data);
        })
    );
    return results;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.status = 'fetching';
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = 'success';
                state.list = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    }
});

export default pokemonSlice.reducer;
