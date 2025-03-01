<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dataFile = "donations.json";

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Invalid request");
}

// Get form data safely
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$amount = isset($_POST['amount']) ? trim($_POST['amount']) : '';
$transaction_id = isset($_POST['transaction_id']) ? trim($_POST['transaction_id']) : '';

if (empty($name) || empty($amount) || empty($transaction_id)) {
    die("All fields are required.");
}

// Check if donations.json exists, else create it
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([])); // Create empty JSON array
}

// Load existing data
$donations = json_decode(file_get_contents($dataFile), true);
if (!is_array($donations)) {
    $donations = []; // Reset to empty array if corrupt
}

// Append new donation
$newDonation = [
    "name" => $name,
    "amount" => $amount,
    "transaction_id" => $transaction_id,
    "date" => date("Y-m-d H:i:s")
];

$donations[] = $newDonation;

// Save back to JSON (ensure file write success)
if (file_put_contents($dataFile, json_encode($donations, JSON_PRETTY_PRINT)) === false) {
    die("Error saving data.");
}

echo "உங்கள் நன்கொடை பதிவு செய்யப்பட்டது!";
?>
