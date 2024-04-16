<?php

namespace App\Http\Controllers\Team;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Team\DeleteRequest;
use App\Http\Requests\Team\FindByUserIdRequest;
use App\Http\Requests\Team\FindRequest;
use App\Http\Requests\Team\StoreRequest;
use App\Http\Requests\Team\UpdateRequest;
use App\Services\Team\TeamService;
use Illuminate\Http\JsonResponse;
use Throwable;

class TeamController extends Controller
{
    protected $teamService;

    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }

    public function find(FindRequest $request): JsonResponse
    {
        try {
            $data = $this->teamService->find($request->validated());
            return ReturnApi::success($data, "time encontrado com sucesso!");
        } catch (Throwable $e) {
            dd($e);
            throw new ApiException($e->getMessage() ?? "Erro ao encontrar time", $e->getCode());
        }
    }

    public function store(StoreRequest $request): JsonResponse
    {
        try {
            $data = $this->teamService->store($request->validated());
            return ReturnApi::success($data, "time criado com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao criar time", $e->getCode());
        }
    }

    public function findByUserId(FindByUserIdRequest $request): JsonResponse
    {
        try {
            $data = $this->teamService->findByUserId($request->validated());
            return ReturnApi::success($data, "times encontrados com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao encontrar times", $e->getCode());
        }
    }

    public function update(UpdateRequest $request): JsonResponse
    {
        try {
            $data = $this->teamService->update($request->validated());
            return ReturnApi::success($data, "time atualizado com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao atualizar time", $e->getCode());
        }
    }

    public function delete(DeleteRequest $request): JsonResponse
    {
        try {
            $data = $this->teamService->delete($request->validated());
            return ReturnApi::success($data, "time apagado com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao apagar time", $e->getCode());
        }
    }

}
