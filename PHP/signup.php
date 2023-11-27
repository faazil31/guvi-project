<?php
// Establish a connection to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "signup";

$conn = new mysqli($servername, $username, $password, $dbname, 3306);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the registration form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $raw_password = $_POST["password"];

    // Validate inputs (add more validation as needed)
    if (empty($username) || empty($email) || empty($raw_password)) {
        echo "Please fill in all fields.";
        exit();
    }

    // Check if the email already exists
    $check_email_query = "SELECT Email FROM registration WHERE Email = ?";
    $check_stmt = $conn->prepare($check_email_query);
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        echo "<script>alert('Email already exists. Please choose a different email.');";
        echo "window.location.href = 'https://localhost/GUVI/signup.html';</script>";
        $check_stmt->close();
        $conn->close();
        exit();
    }

    $check_stmt->close();

    // Hash the password for security
    $password = password_hash($raw_password, PASSWORD_DEFAULT);

    // Use prepared statements to prevent SQL injection
    $insert_query = "INSERT INTO registration (Name, Email, Password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>
