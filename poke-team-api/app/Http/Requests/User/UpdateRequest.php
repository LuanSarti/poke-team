<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'id' => [
                'integer',
                'required',
                'exists:users,id'
            ],
            'name' => [
                'string',
                'required'
            ],
            'email' => [
                'email',
                'required',
                'unique:users,email'
            ],
            'password' => [
                'string',
                'required',
                'confirmed',
                'min:6'
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'id do usuário',
            'name' => 'nome',
            'email' => 'e-mail',
            'password' => 'senha'
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }
}
