<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jalalia";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT date, fajr, dhuhr, asr, maghrib, isha, jummah, eid1, eid2 FROM calendar WHERE date = CURDATE()";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $data = $result->fetch_assoc();
  echo json_encode($data);
} else {
  echo json_encode(array("error" => "No records found for date: " . date("Y-m-d")));
}
$conn->close();
?>
