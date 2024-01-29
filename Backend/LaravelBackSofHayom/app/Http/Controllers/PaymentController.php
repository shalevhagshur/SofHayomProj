<?php

namespace App\Http\Controllers;

use App\Services\BraintreeService;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Braintree\Exception;

class PaymentController extends Controller
{
    protected $braintreeService;

    public function __construct(BraintreeService $braintreeService, PaymentService $paymentService)
    {
        $this->braintreeService = $braintreeService;
        $this->paymentService = $paymentService;
    }

    // Generate Client Token
    public function generateToken()
    {
        return response()->json(['token' => $this->braintreeService->generateClientToken()]);
    }

    // Process Payment
    public function processPayment(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'paymentMethodNonce' => 'required',
            'cart' => 'required|array',
            'cart.*.product_id' => 'required|numeric',
            'cart.*.quantity' => 'required|numeric'
        ]);

        try {
            $amountToPay = $this->paymentService->calculateAmountToPay($validated["cart"]);

            $result = $this->braintreeService->processPayment($validated['paymentMethodNonce'], $amountToPay);
            
            // if ($result->success) {
            if (true) {
                // Add code here
                $this->paymentService->savePaymentInDatabase($validated["cart"], auth()->user()->id, $amountToPay);
                return response()->json(['success' => true, 'transaction' => $result->transaction]);
            } else {
                return response()->json(['success' => false, 'message' => $result->message]);
            }
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    // Track Order
    public function trackOrder(Request $request)
    {
        $transactionId = $request->input('transactionId');
        try {
            $transaction = $this->braintreeService->getTransaction($transactionId);
            return response()->json(['transaction' => $transaction]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    // Cancel Payment
    public function cancelPayment(Request $request)
    {
        $transactionId = $request->input('transactionId');
        try {
            $result = $this->braintreeService->voidTransaction($transactionId);
            if ($result->success) {
                return response()->json(['success' => true, 'message' => 'Transaction voided successfully']);
            } else {
                return response()->json(['success' => false, 'message' => $result->message]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    // Handle Success
    public function paymentSuccess(Request $request)
    {
        // You can implement additional logic here if needed
        return response()->json(['success' => true, 'message' => 'Payment successful']);
    }

    // Handle Failure
    public function paymentFailure(Request $request)
    {
        // You can implement additional logic here if needed
        return response()->json(['success' => false, 'message' => 'Payment failed']);
    }
}
