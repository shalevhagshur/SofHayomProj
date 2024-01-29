<?php

namespace App\Services;

use Braintree\Gateway;
use Braintree\Exception;

class BraintreeService
{
    protected $gateway;

    public function __construct()
    {
        $this->gateway = new Gateway([
            'environment' => env('BRAINTREE_ENVIRONMENT'),
            'merchantId' => env('BRAINTREE_MERCHANT_ID'),
            'publicKey' => env('BRAINTREE_PUBLIC_KEY'),
            'privateKey' => env('BRAINTREE_PRIVATE_KEY'),
        ]);
    }

    public function generateClientToken()
    {
        return $this->gateway->clientToken()->generate();
    }

    public function processPayment($nonce, $amount)
    {
        try {
            return $this->gateway->transaction()->sale([
                'amount' => $amount,
                'paymentMethodNonce' => $nonce,
                'options' => [
                    'submitForSettlement' => true
                ]
            ]);
        } catch (Exception $e) {
            // Handle Braintree exceptions
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function getTransaction($transactionId)
    {
        try {
            return $this->gateway->transaction()->find($transactionId);
        } catch (Exception $e) {
            // Handle Braintree exceptions
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function voidTransaction($transactionId)
    {
        try {
            return $this->gateway->transaction()->void($transactionId);
        } catch (Exception $e) {
            // Handle Braintree exceptions
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    // Additional methods as required...
}
