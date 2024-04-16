<?php

namespace App\Http\Requests\Team;

use App\Helpers\Requests\Team\UserIdRuleHelper;
use Illuminate\Foundation\Http\FormRequest;

class FindByUserIdRequest extends FormRequest
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
            'userId' => UserIdRuleHelper::rule()
        ];
    }

    public function attributes()
    {
        return [
            'userId' => UserIdRuleHelper::attribute()
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'userId' => $this->route('userId')
        ]);
    }
}
