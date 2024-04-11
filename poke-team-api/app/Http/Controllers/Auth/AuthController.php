<?php

namespace App\Http\Controllers\Auth;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\AuthService;
use Throwable;

class AuthController extends Controller
{

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        try {
            $data = $this->authService->register($request->validated());
            return ReturnApi::success($data, "Usuário criado com sucesso!");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao criar usuário", $e->getCode());
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $this->authService->login($request->validated());
            return ReturnApi::success($data, "Usuário encontrado com sucesso");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao logar usuário", $e->getCode());
        }
    }

    public function me()
    {
        try {
            $data = $this->authService->me();
            return ReturnApi::success($data, "Usuário encontrado");
        } catch (Throwable $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao consultar usuário", $e->getCode());
        }
    }
}
