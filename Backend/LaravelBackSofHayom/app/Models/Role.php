<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    // Define fillable attributes as needed
    protected $fillable = ['role'];

    // Relationship with User model
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
