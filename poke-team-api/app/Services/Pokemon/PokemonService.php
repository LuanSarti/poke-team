<?php

namespace App\Services\Pokemon;

use Illuminate\Support\Facades\Http;

class PokemonService
{
    public function list($data): array
    {
        $listPokemon = Http::get("https://pokeapi.co/api/v2/pokemon", [
            'offset' => $data['offset']
        ])['results'];

        $list = [];
        foreach($listPokemon as $pokemon){
            $url = $pokemon['url'];
            $listData = [];

            $pokemonData = Http::get($url)->json();

            $listData['id'] = $pokemonData['id'];
            $listData['name'] = $pokemonData['forms'][0]['name'];
            $listData['sprites'] = $pokemonData['sprites'];

            $list[] = $listData;
        }
        return $list;
    }

    public function find($data): array
    {
        $pokemonData = Http::withUrlParameters([
            'endpoint' => 'https://pokeapi.co/api/v2/pokemon',
            'id' => $data['id']
        ])->get('{+endpoint}/{id}')->json();

        $listData = [];

        $listData['id'] = $pokemonData['id'];
        $listData['name'] = $pokemonData['forms'][0]['name'];
        $listData['sprites'] = $pokemonData['sprites'];

        return $listData;
    }
}
