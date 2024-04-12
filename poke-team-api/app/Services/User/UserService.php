<?php

namespace App\Services\User;

use App\Models\User;

class UserService{
    public function update($data): User
    {
        User::find($data['id'])->update($data);
        return User::find($data['id']);
    }

    public function delete($data): bool
    {
        return User::find($data['id'])->delete();
    }
}
