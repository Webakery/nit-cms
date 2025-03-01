
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const filePath = path.join(__dirname, "../../public/donations.json");
  const newDonation = JSON.parse(event.body);

  try {
    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    
    existingData.push(newDonation);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return { statusCode: 200, body: JSON.stringify({ message: "Saved!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to save data" }) };
  }
};
