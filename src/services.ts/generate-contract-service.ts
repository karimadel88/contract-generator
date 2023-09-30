import OpenAI from "openai";

export async function generateContractService(
  language: string,
  type: string,
  sellerName: string,
  buyerName: string,
  contractDate: string,
  contractCountry: string,
  contractType: string
) {
  const openai = new OpenAI({
    apiKey: "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",
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "you will take the seller or renter name, buyer or renter name, rent or sale,the counteract date and the name of the countract country (to know which terms and conditions you will generate for the counteract and to choice the language of the counteract) and format to the specific languge alphapit format ."
      },
      {
        role: "system",
        content: `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body>
        <div style="margin:10px; border:solid 2px black; padding:10px;"><h1 style="text-align: center">Car ${type} Agreement</h1><p style="text-align: center">This Car ${type} Agreement  is made and entered into on this date: 12 of September, 2012 by and between:</p><h2>First contractor:</h2><p>Name: Jane Doe</p><p>Address:___</p><p>Phone:__ </p><p>Email:__</p><h2>Second contractor:</h2><p>Name: John Smith</p><p>Address:___ </p><p>Phone:___</p> <p>Email:___ </p><h2>Vehicle Information:</h2><p>Make: </p><p>Model: </p><p>Year: </p> <p>Vehicle Identification Number (VIN): </p><h2>Terms and Conditions:</h2> <p><strong>Sale of Vehicle:</strong> The Seller agrees to sell the above-described vehicle to the Buyer, and the Buyer agrees to purchase the vehicle from the Seller for the total purchase price of $__________. The Purchase Price shall be paid as follows: (----------------)[Specify payment terms, e.g., cash, check, or bank transfer].</p> <p><strong>Title and Ownership:</strong> The Seller represents and warrants that they are the legal owner of the vehicle, with the right to sell it, and that the vehicle is free from any liens, encumbrances, or claims.</p> <p><strong>Vehicle Condition:</strong> The vehicle is sold "as is," and the Seller makes no warranties or guarantees regarding the condition, fitness for a particular purpose, or merchantability of the vehicle. The Buyer acknowledges that they have inspected the vehicle and are satisfied with its condition.</p><p><strong>Transfer of Title:</strong> The Seller shall transfer the title and ownership of the vehicle to the Buyer upon receipt of the full Purchase Price. Both parties agree to complete all necessary paperwork for the transfer of title promptly.</p><p><strong>Liability:</strong> The Buyer assumes all responsibility and liability for the vehicle from the Effective Date of this Agreement. The Seller shall not be held responsible for any accidents, damages, or issues arising from the use of the vehicle after the Effective Date.</p><p><strong>Indemnification:</strong> Both parties agree to indemnify and hold each other harmless from any claims, damages, or liabilities arising out of the sale and purchase of the vehicle.</p><p><strong>Governing Law:</strong> This Agreement shall be governed by and construed in accordance with the laws of the state of [--------------], without regard to its conflict of law principles.</p><p><strong>Entire Agreement:</strong> This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements or understandings, whether written or oral.</p><p><em>IN WITNESS WHEREOF, the parties hereto have executed this Car Sale Agreement as of the Effective Date.</em></p><p>First contractor's Signature: ___________________________ Date: __________________</p><p>Second contractor's Signature: ___________________________ Date: __________________</p></div></body></html>`,
      },
      {
        role: "user",
        content: `I want ${language} contract I need a ${contractType} contract for a ${type} between ${sellerName} and ${buyerName} on ${contractDate} in ${contractCountry}.`,
      },
    ],
    max_tokens: 2500,
    temperature: 1,
  });

  return response.choices[0].message.content;
}
