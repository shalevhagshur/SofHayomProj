<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // Add this line

class User extends Authenticatable implements JWTSubject // Implement the interface
{
    use Notifiable;

    protected $fillable = [
        'username', 'first_name', 'last_name', 'email', 'password', 'role_id','auth_token','is_business_authorized' 
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

        /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
        public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function isBusinessUser(){
    // Check if the user has role_id 1 (assuming role_id 1 represents business users)
    return $this->role_id === 1;
}
}
