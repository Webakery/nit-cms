const fetch = require("node-fetch");

const GITHUB_REPO = "nit-cms";  // Change this
const GITHUB_USERNAME = "Webakery";  // Change this
const GITHUB_FILE_PATH = "content/donations.json";  // JSON file in repo
const GITHUB_ACCESS_TOKEN = "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";  // Replace with your token

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const formData = JSON.parse(event.body);

        // Fetch existing donations.json from GitHub
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`, {
            headers: { Authorization: `token ${GITHUB_ACCESS_TOKEN}` }
        });

        const fileData = await response.json();
        const existingData = JSON.parse(Buffer.from(fileData.content, "base64").toString());

        // Add new donation
        existingData.push({
            name: formData.name,
            amount: formData.amount,
            transactionId: formData.transactionId,
            date: new Date().toISOString()
        });

        // Convert to base64 (GitHub requires this)
        const updatedContent = Buffer.from(JSON.stringify(existingData, null, 2)).toString("base64");

        // Commit updated file to GitHub
        await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`, {
            method: "PUT",
            headers: {
                Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "New donation added",
                content: updatedContent,
                sha: fileData.sha
            })
        });

        return { statusCode: 200, body: JSON.stringify({ message: "Donation saved successfully!" }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
