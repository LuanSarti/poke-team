<?php

namespace App\Helpers\Requests\Team;

class UserIdRuleHelper
{
    static function rule(): array
    {
        return [
            'integer',
            'required',
            'exists:users,id'
        ];
    }

    static function attribute(): string
    {
        return "id do usuário";
    }
}
