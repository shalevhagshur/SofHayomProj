<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'product_image', 'business_id', 'disabled'];

    // Removed category relationship

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
