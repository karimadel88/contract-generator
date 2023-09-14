import express from "express";
import fs from "fs"; // Import the 'fs' module to work with files
const app = express();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const generateContract = async (
  language: string,
  type: string,
  sellerName: string,
  buyerName: string,
  contractDate: string,
  contractCountry: string,
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a counteracts maker.",
        },
        {
          role: "user",
          content: `I want ${language} contract I need a ${type} contract for a sale between ${sellerName} and ${buyerName} on ${contractDate} in ${contractCountry}.`,
        },
      ],
      max_tokens: 4000,
    });

    // Log the length of the generated text
    // Write the entire response object to a JSON file
    fs.writeFileSync(
      "generated_contract.json",
      JSON.stringify(response, null, 2),
    );

    const generatedText = response.choices[0].message.content;
    if (!generatedText) {
      throw new Error("null Value");
    }

    // Write the generated contract text to an HTML file
    fs.writeFileSync("generated_contract2.html", generatedText);

    return generatedText;
  } catch (error) {
    console.error("Error generating contract:", error);
    throw error;
  }
};

// Example usage
const type = "property";
const sellerName = "Hossam";
const buyerName = "Ahmed";
const contractDate = "2023-09-15";

const contractCountry = "Egypt";
app.listen(3000, () => {
  console.log("Server starting ...");
});

generateContract(
  "english",
  type,
  sellerName,
  buyerName,
  contractDate,
  contractCountry,
)
  .then(generatedContract => {
    console.log("Generated Contract:");
    console.log(generatedContract);
  })
  .catch(err => {
    console.error("Failed to generate contract:", err);
  });
