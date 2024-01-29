<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $fillable = ['order_id', 'payment_method', 'payment_date', 'receipt_content'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
