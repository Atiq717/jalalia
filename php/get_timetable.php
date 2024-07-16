<?php
require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT date, fajr, fajr_jamah, sunrise, dhuhr, dhuhr_jamah, asr, asr_jamah, sunset, maghrib_jamah, isha, isha_jamah, jummah, eid1, eid2 FROM calendar WHERE date = CURDATE()";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["error" => "No records found for date: " . date("Y-m-d")]);
}

$conn->close();
?>
