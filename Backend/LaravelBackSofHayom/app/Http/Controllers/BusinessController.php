<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $businesses = Business::all();
        return response()->json($businesses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'business_image' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $business = Business::create($request->all());
        return response()->json($business, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $business = Business::findOrFail($id);
        return response()->json($business);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'business_image' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $business = Business::findOrFail($id);
        $business->update($request->all());
        return response()->json($business);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $business = Business::findOrFail($id);
        $business->delete();
        return response()->json(null, 204);
    }
}
