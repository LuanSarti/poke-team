<?php

namespace App\Helpers\Requests\Team;

class NameRuleHelper
{
    static function rule(): array
    {
        return [
            'string',
            'required'
        ];
    }

    static function attribute(): string
    {
        return "nome do time";
    }
}
