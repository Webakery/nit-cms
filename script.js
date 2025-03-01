document.getElementById("donationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const newDonation = {
        name: document.getElementById("name").value,
        amount: document.getElementById("amount").value,
        transactionId: document.getElementById("transactionId").value,
        date: new Date().toISOString()
    };

    // Fetch existing donations.json
    const response = await fetch("/content/donations.json");
    const existingDonations = await response.json();

    // Add new donation
    existingDonations.push(newDonation);

    // Save updated JSON (Only works with GitHub API or a backend)
    localStorage.setItem("donations", JSON.stringify(existingDonations));
    
    alert("நன்கொடை பதிவு செய்யப்பட்டது! (Donation saved)");
    document.getElementById("donationForm").reset();
});
