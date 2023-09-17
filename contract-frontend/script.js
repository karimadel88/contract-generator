document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("counteractForm");
  const resultDiv = document.getElementById("resultDiv");
  const submitButton = document.getElementById("submitButton");
  const spinner = document.getElementById("spinner");
  const successModal = document.getElementById("success-modal");
  const closeModalButton = document.getElementById("close-modal");
  submitButton.addEventListener("click", function () {
    // Show the spinner while waiting for the response
    spinner.style.display = "block";

    // Gather data from form inputs
    const contractCountry = document.getElementById("country").value;
    const type = document.getElementById("conflictType").value;
    const language = document.getElementById("language").value;
    const sellerName = document.getElementById("sellerName").value;
    const buyerName = document.getElementById("buyerName").value;
    const contractDate = document.getElementById("date").value;

    // Create a data object to send to the API
    const data = {
      contractCountry,
      type,
      language,
      sellerName,
      buyerName,
      contractDate,
    };

    // Make a POST request to the /generate API
    fetch("http://127.0.0.0:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.blob()) // Get the response as a blob
      .then((blob) => {
        // Create a blob URL for the response
        const url = window.URL.createObjectURL(blob);

        // Create a link to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.html";

        // Trigger the download
        a.click();

        // Clean up the blob URL
        window.URL.revokeObjectURL(url);

        // Hide the spinner
        spinner.style.display = "none";
      })
      .catch((error) => {
        console.error("Error:", error);

        // Hide the spinner
        spinner.style.display = "none";

        resultDiv.innerHTML = "Error downloading file.";
      });
  });
});
