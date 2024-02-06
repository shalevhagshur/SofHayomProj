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

        // Extract the old image path from the request
        $oldImageURL = $request->input('oldImagePath');

        if ($oldImageURL) {
            // Assuming the URL format is something like http://localhost/storage/images/old.jpg
            // and you need to convert it to a path like images/old.jpg
            $urlPath = parse_url($oldImageURL, PHP_URL_PATH); // This gets '/storage/images/old.jpg'
            
            // Strip out '/storage/' to get the relative path
            $storagePath = substr($urlPath, 9); // Adjust the number based on your actual path
            
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            return response()->json(['url' => Storage::disk('public')->url($path)], 200);
        }

        return response()->json(['error' => 'Upload failed'], 400);
    }
}
