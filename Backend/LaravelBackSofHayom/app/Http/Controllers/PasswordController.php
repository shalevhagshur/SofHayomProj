<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class PasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? response()->json(['status' => __($status)])
                    : response()->json(['email' => __($status)]);
    }

    public function resetPassword(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);
    
        // Fetch the user by email
        $user = User::where('email', $request->email)->first();
    
        // Check if the current password is correct
        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password does not match your current password.'],
            ]);
        }
    
        // Update the user's password
        $user->password = Hash::make($request->new_password);
        $user->save();
    
        return response()->json(['message' => 'Password successfully updated']);
    }    
}
    
