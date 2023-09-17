import express from "express";
import generateContract from "./controllers/generate-contract";
const app = express();
// Example usage
const type = "property";
const sellerName = "Hossam";
const buyerName = "Ahmed";
const contractDate = "2023-09-15";

app.use(express.json());
app.post("/generate", generateContract);

app.listen(3000, () => {
  console.log("Server starting ...");
});
