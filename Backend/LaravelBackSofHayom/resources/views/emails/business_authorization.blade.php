<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Business Account Authorization</title>
    <style>
        /* You can add inline CSS styles here */
    </style>
</head>
<body>
    <h1>Business Account Authorization</h1>
    <p>Hello,</p>
    <p>A request to authorize a new business account has been received. Please review the details below:</p>
    <p><strong>Username:</strong> {{ $user->username }}</p>
    <p><strong>Email:</strong> {{ $user->email }}</p>
    <p>To authorize this account, please click the link below:</p>
    <p><a href="{{ $authorizationUrl }}">Authorize Business Account</a></p>
</body>
</html>
