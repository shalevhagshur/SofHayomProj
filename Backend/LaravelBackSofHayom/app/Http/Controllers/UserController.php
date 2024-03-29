<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users|max:255',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|max:255',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'nullable|string|max:255',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'password' => 'nullable|string|min:8', // Adjust validation as needed
            'role_id' => 'nullable|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = User::findOrFail($id);

        $data = $request->all();

        // Hash the password, if it's provided
        if ($request->has('password') && $request->password) {
            $data['password'] = Hash::make($request->password);
        }

        // Update the user with the provided data
        $user->update($data);

        return response()->json($user);
    }

    public function changePassword(Request $request, int $id)
{
    $validator = Validator::make($request->all(), [
        'currentPassword' => 'required|string',
        'newPassword' => 'required|string|min:8',
        'confirmPassword' => 'required|string|same:newPassword',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    $user = User::findOrFail($id);

    // Check if the current password matches the user's stored password
    if (!Hash::check($request->input('currentPassword'), $user->password)) {
        return response()->json(['errors' => ['currentPassword' => 'Incorrect current password']], 400);
    }

    // Update the user's password with the new password
    $newPassword = $request->input('newPassword');
    $user->password = Hash::make($newPassword);
    $user->save();

    return response()->json(['message' => 'Password changed successfully']);
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }

    
}
