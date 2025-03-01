<?php
// Read existing donations or create an empty array if file doesn't exist
$data = json_decode(file_get_contents('donations.json'), true) ?: [];

// Get user input
$new_entry = [
    "name" => $_POST["name"],
    "transaction_id" => $_POST["transaction_id"],
    "amount" => $_POST["amount"],
    "timestamp" => date("Y-m-d H:i:s")
];

// Add new donation to array
$data[] = $new_entry;

// Save updated array to JSON file
file_put_contents('donations.json', json_encode($data, JSON_PRETTY_PRINT));

echo "Success";
?>
