import cors from "cors";
import express from "express";
import generateContract from "./controllers/generate-contract";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.post("/generate", generateContract);

app.listen(3000, () => {
  console.log("Server starting ...");
});
