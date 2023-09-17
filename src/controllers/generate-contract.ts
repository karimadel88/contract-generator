import { generateContractService } from "app/services.ts/generate-contract-service";
import fs from "fs";
import path from "path";

export default async function generateContract(request: any, response: any) {
  try {
    const {
      language,
      type,
      sellerName,
      buyerName,
      contractDate,
      contractCountry,
    } = request.body;

    // Assuming generateContractService returns an HTML string
    const contractHTML = (await generateContractService(
      language,
      type,
      sellerName,
      buyerName,
      contractDate,
      contractCountry,
    )) as string; // Ensure that it returns a string

    // Sanitize the date string for use as a filename
    const sanitizedDate = contractDate.replace(/[^a-zA-Z0-9-]+/g, "_");

    // Define the filename with the sanitized date string
    const fileName = `${sanitizedDate}.html`;

    // Define the directory where the HTML file should be saved
    const directoryPath = path.join(__dirname, "../storage"); // Replace with the actual relative path

    // Ensure the directory exists, create it if necessary
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Define the full file path
    const filePath = path.join(directoryPath, fileName);

    // Write the HTML content to the file
    fs.writeFileSync(filePath, contractHTML);

    // Send the HTML file as a response, specifying the correct root
    return response.sendFile(fileName, { root: directoryPath });
  } catch (error: Error | any) {
    // In case of an error, send a 500 Internal Server Error response
    return response.status(500).send({
      error: error.message,
    });
  }
}
