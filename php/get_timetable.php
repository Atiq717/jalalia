<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include database configuration
require '../config.php'; // Adjust the path if necessary

header('Content-Type: application/json');

try {
    $date = date('Y-m-d'); // Current date

    $sql = "SELECT date, fajr, fajr_jamah, sunrise, dhuhr, dhuhr_jamah, asr, asr_jamah, sunset, maghrib_jamah, isha, isha_jamah, jummah, eid1, eid2 FROM calendar WHERE date = '$date'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        echo json_encode($data);
    } else {
        echo json_encode(['error' => "No records found for date: $date"]);
    }

    $conn->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
