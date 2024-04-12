<?php

namespace App\Http\Controllers\User;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\DeleteRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Services\User\UserService;
use Illuminate\Http\JsonResponse;
use Throwable;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function update(UpdateRequest $request): JsonResponse
    {
        try {
            $data = $this->userService->update($request->validated());
            return ReturnApi::success($data, "Usuário atualizado com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao atualizar usuário", $e->getCode());
        }
    }

    public function delete(DeleteRequest $request): JsonResponse
    {
        try {
            $data = $this->userService->delete($request->validated());
            return ReturnApi::success($data, "Usuário apagado com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao apagar usuário", $e->getCode());
        }
    }
}
