<?php

namespace App\Http\Requests\Team;

use App\Helpers\Requests\Team\NameRuleHelper;
use App\Helpers\Requests\Team\PokemonRuleHelper;
use App\Helpers\Requests\Team\UserIdRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => UserIdRuleHelper::rule(),
            'name' => NameRuleHelper::rule(),
            'pokemon_1' => PokemonRuleHelper::rule('required'),
            'pokemon_2' => PokemonRuleHelper::rule(),
            'pokemon_3' => PokemonRuleHelper::rule(),
            'pokemon_4' => PokemonRuleHelper::rule(),
            'pokemon_5' => PokemonRuleHelper::rule()
        ];
    }

    public function attributes(): array
    {
        return [
            'user_id' => UserIdRuleHelper::attribute(),
            'name' => NameRuleHelper::attribute(),
            'pokemon_1' => 'pokémon 1',
            'pokemon_2' => 'pokémon 2',
            'pokemon_3' => 'pokémon 3',
            'pokemon_4' => 'pokémon 4',
            'pokemon_5' => 'pokémon 5'
        ];
    }
}
