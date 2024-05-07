import express, { Request, Response } from "express";
import connenctToDatabase from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(express.json());

const PORT = 1337;

connenctToDatabase();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("Server up and running");
});
