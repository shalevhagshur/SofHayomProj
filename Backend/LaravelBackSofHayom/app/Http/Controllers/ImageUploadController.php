<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048', // 2MB Max
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');

            // Optionally return the URL to the uploaded file
            return response()->json(['url' => Storage::disk('public')->url($path)], 200);
        }

        return response()->json(['error' => 'Upload failed'], 400);
    }
}
