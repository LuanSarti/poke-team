<?php

namespace App\Http\Requests\Team;

use App\Helpers\Requests\Team\IdRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class FindRequest extends FormRequest
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
            'id' => IdRuleHelper::rule()
        ];


    }

    public function attributes(): array
    {
        return [
            'id' => IdRuleHelper::attribute()
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }
}
