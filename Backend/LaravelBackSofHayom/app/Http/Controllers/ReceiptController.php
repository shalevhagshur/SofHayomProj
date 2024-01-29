<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $receipts = Receipt::all();
        return response()->json($receipts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'payment_method' => 'required|string|max:255',
            'payment_date' => 'required|date',
            'receipt_content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $receipt = Receipt::create($request->all());
        return response()->json($receipt, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $receipt = Receipt::findOrFail($id);
        return response()->json($receipt);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'payment_method' => 'required|string|max:255',
            'payment_date' => 'required|date',
            'receipt_content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $receipt = Receipt::findOrFail($id);
        $receipt->update($request->all());
        return response()->json($receipt);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $receipt = Receipt::findOrFail($id);
        $receipt->delete();
        return response()->json(null, 204);
    }
}
