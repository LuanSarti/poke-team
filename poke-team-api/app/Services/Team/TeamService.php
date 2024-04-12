<?php

namespace App\Services\Team;

use App\Models\Team;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TeamService
{
    public function index(): LengthAwarePaginator
    {
        return Team::paginate(10);
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
}
