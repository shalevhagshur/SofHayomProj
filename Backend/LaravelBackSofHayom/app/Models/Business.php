<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $fillable = ['name', 'business_image', 'address', 'auth_token'];

    // Removed the categories() relationship method

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
