const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    try {
        // Parse the incoming form data
        const formData = JSON.parse(event.body);

        // Read existing donations.json
        const filePath = path.join(__dirname, "../content/donations.json");
        const existingDonations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // Add new donation
        existingDonations.push({
            name: formData.name,
            amount: formData.amount,
            transactionId: formData.transactionId,
            date: new Date().toISOString()
        });

        // Save back to donations.json
        fs.writeFileSync(filePath, JSON.stringify(existingDonations, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Donation saved successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error saving donation", error: error.toString() })
        };
    }
};
