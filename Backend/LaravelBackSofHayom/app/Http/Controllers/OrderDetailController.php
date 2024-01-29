<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderDetails = OrderDetail::all();
        return response()->json($orderDetails);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $orderDetail = OrderDetail::create($request->all());
        return response()->json($orderDetail, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        return response()->json($orderDetail);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $orderDetail = OrderDetail::findOrFail($id);
        $orderDetail->update($request->all());
        return response()->json($orderDetail);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $orderDetail->delete();
        return response()->json(null, 204);
    }
}
