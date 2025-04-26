//db_config.php
<?php
// Database configuration
$host = "localhost";
$user = "root";
$password = "";
$dbname = "story_game";

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>