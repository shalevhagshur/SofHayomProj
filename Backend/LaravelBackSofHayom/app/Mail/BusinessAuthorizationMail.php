<?php

namespace App\Mail; // Add the namespace here

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BusinessAuthorizationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $authorizationUrl;

    public function __construct($user, $authorizationUrl)
    {
        $this->user = $user;
        $this->authorizationUrl = $authorizationUrl;
    }

    public function build()
    {
        return $this->subject('Business Account Authorization')
                    ->view('emails.business_authorization');
    }
}
