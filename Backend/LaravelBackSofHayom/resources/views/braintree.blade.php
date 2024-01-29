<!DOCTYPE html>
<html>
<head>
    <title>Braintree Drop-In</title>
    <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
</head>
<body>
    <div id="dropin-container"></div>
    <button id="submit-button">Submit payment</button>

    <script>
        var button = document.querySelector('#submit-button');

        var cart = "{{ $cart }}";

        braintree.dropin.create({
            authorization: '{{ $token }}',
            container: '#dropin-container'
        }, function (createErr, instance) {
            button.addEventListener('click', function () {
                instance.requestPaymentMethod(function (err, payload) {
                    if (err) {
                        console.log('Error:', err);
                        return;
                    }

                    // Send the nonce to your server
                    fetch('/api/payment/process', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({nonce: payload.nonce})
                    });
                });
            });
        });
    </script>
</body>
</html>
