<?php

namespace App\Http\Controllers\Pokemon;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Pokemon\FindRequest;
use App\Http\Requests\Pokemon\ListRequest;
use App\Services\Pokemon\PokemonService;
use Illuminate\Http\JsonResponse;
use Throwable;

class PokemonController extends Controller
{
    protected $pokemonServie;

    public function __construct(PokemonService $pokemonServie)
    {
        $this->pokemonServie = $pokemonServie;
    }

    public function list(ListRequest $request): JsonResponse
    {
        try{
            $data = $this->pokemonServie->list($request->validated());
            return ReturnApi::success($data, "pokémons encontrados com sucesso!");
        } catch(Throwable $e){
            throw new ApiException($e->getMessage() ?? "Erro ao encontrar pokémons", $e->getCode());
        }
    }

    public function find(FindRequest $request): JsonResponse
    {
        try{
            $data = $this->pokemonServie->find($request->validated());
            return ReturnApi::success($data, "pokémon encontrado com sucesso!");
        } catch(Throwable $e){
            throw new ApiException($e->getMessage() ?? "Erro ao encontrar pokémon", $e->getCode());
        }
    }
}
