<?php

namespace App\Http\Requests\Auth;

use App\Traits\BasicFormRequestValidation;
use Illuminate\Foundation\Http\FormRequest;


class RegisterRequest extends FormRequest
{

    use BasicFormRequestValidation;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            "name" => [
                "string",
                "required",
                "min:6"
            ],
            "email" => [
                "email",
                "required",
                "unique:users,email"
            ],
            "password" => [
                "string",
                "required",
                'confirmed',
                "min:6"
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            "name" => "nome",
            "email" => "e-mail",
            "password" => "senha"
        ];
    }
}
