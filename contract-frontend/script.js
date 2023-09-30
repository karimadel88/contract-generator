document.addEventListener("DOMContentLoaded", function () {
  const resultDiv = document.getElementById("resultDiv");
  const submitButton = document.getElementById("submitButton");
  const downloadButton = document.getElementById("downloadButton");
  const spinner = document.getElementById("spinner");

  let responseBlob = null;

  // Function to show an error message in the result div
  function showError(message) {
    resultDiv.innerHTML = message;
  }

  // Function to gather form data
  function getFormData() {
    const contractCountry = document.getElementById("country").value;
    const type = document.getElementById("type").value;
    const language = document.getElementById("language").value;
    const sellerName = document.getElementById("sellerName").value;
    const buyerName = document.getElementById("buyerName").value;
    const contractDate = document.getElementById("date").value;
    const contractType = document.getElementById("contractType").value;

    return {
      contractCountry,
      type,
      language,
      sellerName,
      buyerName,
      contractDate,
      contractType,
    };
  }

  // Function to handle form submission
  function handleSubmit() {
    // Show the spinner while waiting for the response
    spinner.style.display = "block";

    const formData = getFormData();

    // Validate required fields
    for (const key in formData) {
      if (!formData[key]) {
        showError("Please fill in all required fields.");
        spinner.style.display = "none";
        return;
      }
    }

    // Make a POST request to the /generate API
    fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        responseBlob = blob;
        const url = window.URL.createObjectURL(blob);

        window.open(url, "_blank");

        downloadButton.style.display = "block";

        window.URL.revokeObjectURL(url);

        spinner.style.display = "none";
      })
      .catch((error) => {
        console.error("Error:", error);

        spinner.style.display = "none";

        showError("Error downloading file.");
      });
  }

  // Add click event listener for the submit button
  submitButton.addEventListener("click", handleSubmit);

  // Add click event listener for the download button
  downloadButton.addEventListener("click", function () {
    if (responseBlob) {
      const reader = new FileReader();
      reader.onload = function () {
        const htmlContent = reader.result;
        Export2Word(htmlContent);
      };
      reader.readAsText(responseBlob);
    }
  });

  // Rest of the code
  const rerenderButton = document.getElementById("rerenderButton");
  rerenderButton.addEventListener("click", function () {
    // Reload the page
    location.reload();
  });

  // Sample data for countries and languages (replace with your data source)
  const countries = ["USA", "Canada", "UK", "Germany", "France","Itali","China","Egypt"];
  const languages = ["English", "Spanish", "French", "German", "Italian","Chinese","Arabic"];

  // Function to populate a dropdown with options
  function populateDropdown(selectElement, options) {
    const dropdown = document.getElementById(selectElement);

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.textContent = option;
      optionElement.value = option.toLowerCase(); // You can set the value as needed

      dropdown.appendChild(optionElement);
    });
  }

  // Call the function to populate the Country and Language dropdowns
  populateDropdown("country", countries);
  populateDropdown("language", languages);

  function Export2Word(htmlContent, filename = "document.doc") {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'/><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + htmlContent + postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    var url =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(html);

    filename = filename ? filename + ".doc" : "document.doc";

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }
});
