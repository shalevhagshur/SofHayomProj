<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Receipt;

class PaymentService
{
    public function __construct()
    {
        return;
    }

    public function calculateAmountToPay($cart)
    {
        $total = 0;
        foreach ($cart as $item) {
            $product = Product::find($item["product_id"]);
            if (!$product) {
                return abort(400, "Product doesn't exist.");
            }
            $total += $product->price * $item["quantity"];
        }
        return $total;
    }

    public function savePaymentInDatabase(array $cart, $user_id, $total)
    {
        // Create new order
        $order = new Order([
            "user_id"=> $user_id,
            "total" => $total
        ]);
        $order->save();

        // Create receipt
        $receipt = new Receipt([
            "order_id" => $order->id,
            "payment_method" => "card",
            "payment_date" => $order->created_at->format('Y-m-d H:i:s'), // Fix the arrow here
            "receipt_content" => "You were charged " . $total . " for your items."
        ]);
        $receipt->save();

        // Create new order details
        foreach ($cart as $item) {
            OrderDetail::create([
                "order_id" => $order->id,
                "product_id" => $item["product_id"],
                "quantity" => $item["quantity"],
            ]);
        }
    }
}
