<?php

namespace App\Http\Requests\Pokemon;

use Illuminate\Foundation\Http\FormRequest;

class ListRequest extends FormRequest
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
            'offset' => [
                'integer',
                'required'
            ]
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'offset' => $this->route('offset')
        ]);
    }

    public function attributes(): array
    {
        return [
            'offset' => 'deslocamento'
        ];
    }
}
