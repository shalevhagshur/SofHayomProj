<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Mail\BusinessAuthorizationMail;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
            // 'first_name' and 'last_name' are not required
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $user = User::create([
            'username' => $request->username,
            'first_name' => $request->first_name, // Optional
            'last_name' => $request->last_name, // Optional
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // Set other user attributes as needed
        ]);
    
        $token = JWTAuth::fromUser($user);
    
        return response()->json(compact('user', 'token'), 201);
    }
    

    /**
     * Authenticate a user and return the token if the provided credentials are correct.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    
    public function registerBusiness(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        // Create the user with a random auth_token
        $user = User::create([
            'username' => $request->username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 1, // Business role id
            'is_business_authorized' => false,
            'auth_token' => Str::random(200), // Generate a unique token
        ]);
    
        // Generate the JWT token for the user
        $token = JWTAuth::fromUser($user);
    
        // Send the authorization email
        $this->sendAuthorizationEmail($user);
    
        return response()->json(compact('user', 'token'), 201);
    }
    

    protected function sendAuthorizationEmail($user)
    {
        //generate auth token
        $user->auth_token = Str::random(200);
        $user->save();

        $authorizationUrl = route('authorizeBusiness', ['token' => $user->auth_token]);
        $targetEmail = "sofhayom@gmail.com"; // Set your specific email address here

        Mail::to($targetEmail)->send(new BusinessAuthorizationMail($user, $authorizationUrl));
    }

    public function authorizeBusiness(Request $request, $token)
    {
        // Find the user with the given auth token
        $user = User::where('auth_token', $token)->first();
    
        if (!$user) {
            // If the user with the provided auth token is not found, return an error response
            return response()->json(['error' => 'Invalid auth token'], 401);
        }
    
        // Update the is_business_authorized field to true
        $user->update(['is_business_authorized' => true]);
    
        // You can optionally remove the auth token to prevent further use
        $user->update(['auth_token' => null]);
    
        return response()->json(['message' => 'Business user authorized successfully']);
    }
    

    /**
     * Get the token array structure.
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }
}


