<?php

namespace App\Services\Team;

use App\Models\Team;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class TeamService
{
    public function find($data): Team
    {
        return Team::find($data['id']);
    }

    public function store($data): Team
    {
        return Team::create($data);
    }

    public function update($data): Team
    {
        Team::find($data['id'])->update($data);
        return Team::find($data['id']);
    }

    public function delete($data): bool
    {
        return Team::find($data['id'])->delete();
    }

    public function findByUserId($data): Collection
    {
        return Team::where('user_id', $data['userId'])->get();
    }
}
