<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Collection;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'pokemon_1',
        'pokemon_2',
        'pokemon_3',
        'pokemon_4',
        'pokemon_5'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $appends = [
        'user'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getUserAttribute(): Collection
    {
        return $this->user()->get();
    }
}
