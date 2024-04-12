<?php

namespace App\Services\Auth;

use App\Exceptions\ApiException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function register($data): User
    {
        return User::create(
            [
                "name" => $data["name"],
                "email" => $data["email"],
                "password"  => Hash::make($data["password"])
            ]
        );
    }

    public function login($data): array
    {
        if (Auth::attempt(["email" => $data["email"], "password" => $data["password"]])) {
            $token = JWTAuth::fromUser(Auth::user());
            return ["user" => Auth::user(), "token" => $token];
        }
        throw new ApiException("Usuário não encontrado");
    }

    public function me(): User
    {
        if(!JWTAuth::user()) throw new ApiException("Usuário não encontrado");
        return JWTAuth::user();
    }
}
