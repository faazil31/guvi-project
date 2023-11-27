<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

if (!$redis->ping()) {
    die("Redis server is not running");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $cacheKey = "user:$email:password:$hashedPassword";

    if ($redis->exists($cacheKey)) {
        echo "success (from cache)";
    } else {
        $servername = "localhost";
        $dbusername = "root";
        $dbpassword = "";
        $dbname = "signup";
        $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        $stmt = mysqli_prepare($conn, "SELECT * FROM registration WHERE email=?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) > 0) {
            // Verify the hashed password
            $row = mysqli_fetch_assoc($result);
            if (password_verify($password, $row['password'])) {
                echo "success";
                $redis->set($cacheKey, 1);
                $redis->expire($cacheKey, 60); 
            } else {
                echo "Invalid email or password";
            }
        } else {
            echo "Invalid email or password";
        }

        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }
} else {
    echo "Invalid request method.";
}

$redis->close();
?>
