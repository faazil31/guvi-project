<?php
$url = 'mongodb://localhost:27017';
$dbName = 'users';

try {
    $client = new MongoDB\Client($url);
    $users = $client->selectCollection($dbName, 'users');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = $_POST['name'];
        $age = $_POST['age'];
        $phone = $_POST['phone'];

        // Basic input validation
        if (empty($name) || empty($age) || empty($phone)) {
            echo 'Please fill in all fields.';
        } else {
            $userData = [
                'name' => $name,
                'age' => $age,
                'phone' => $phone,
            ];

            $result = $users->insertOne($userData);

            if ($result->getInsertedCount() === 1) {
                echo 'User created successfully';
            } else {
                echo 'Failed to create user';
            }
        }
    }
} catch(Exception $e) {
    echo 'An error occurred: ' . $e->getMessage();
}
?>
