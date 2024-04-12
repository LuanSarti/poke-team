<?php

namespace App\Helpers\Requests\Team;

class PokemonRuleHelper
{
    static function rule($required = null): array
    {
        return [
            'integer',
            $required
        ];
    }
}
