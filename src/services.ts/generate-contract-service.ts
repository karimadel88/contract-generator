import OpenAI from "openai";

export async function generateContractService(
  language: string,
  type: string,
  sellerName: string,
  buyerName: string,
  contractDate: string,
  contractCountry: string,
) {
  const openai = new OpenAI({
    apiKey: "",
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          ", you will take the seller name, buyer name, the counteract date and the name of the countract country (to know which terms and conditions you will generate for the counteract and to choice the language of the counteract). return the contract in html format",
      },
      {
        role: "system",
        content: "return the contract in html format",
      },
      {
        role: "user",
        content: `I want ${language} contract I need a ${type} contract for a sale between ${sellerName} and ${buyerName} on ${contractDate} in ${contractCountry}.`,
      },
    ],
    max_tokens: 3000,
    temperature: 1,
  });

  return response.choices[0].message.content;
}
