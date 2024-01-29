<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;  // Import the User model

class Order extends Model
{
    protected $fillable = ['user_id', 'total']; // removed 'receipt_id'

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function receipt()
    {
        return $this->hasOne(Receipt::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
