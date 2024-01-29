<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class BraintreeController extends Controller
{
    public function showDropinUI(Request $request)
    {
        $clientToken = $request->query('token');
        return view('braintree_dropin', ['clientToken' => $clientToken]);
    }
}
