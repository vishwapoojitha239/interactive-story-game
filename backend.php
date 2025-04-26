<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "story_game";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $genre = $_POST['genre'];
    $clue = $_POST['clue'];

    $stmt = $conn->prepare("INSERT INTO clues (genre, clue) VALUES (?, ?)");
    $stmt->bind_param("ss", $genre, $clue);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Clue saved successfully"]);
    } else {
        echo json_encode(["error" => "Failed to save clue"]);
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $genre = $_GET['genre'];

    // DEBUG: Check if the genre is received correctly
    error_log("Genre received: " . $genre); 

    $stmt = $conn->prepare("SELECT clue FROM clues WHERE genre = ?");
    $stmt->bind_param("s", $genre);
    $stmt->execute();
    $result = $stmt->get_result();

    $clues = [];
    while ($row = $result->fetch_assoc()) {
        $clues[] = $row;
    }

    // DEBUG: Print fetched clues to verify the data
    error_log("Fetched Clues: " . json_encode($clues));

    echo json_encode($clues);
    
    $stmt->close();
}

$conn->close();
?>