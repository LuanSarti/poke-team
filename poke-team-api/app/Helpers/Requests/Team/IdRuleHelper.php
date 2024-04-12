<?php

namespace App\Helpers\Requests\Team;

class IdRuleHelper
{
    static function rule(): array
    {
        return [
            'integer',
            'required',
            'exists:teams,id'
        ];
    }

    static function attribute(): string
    {
        return "id do time";
    }
}
