import express, { Request, Response } from "express";

const app = express();

//get requests
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running..");
});

app.get("/test", (req: Request, res: Response) => {
  console.log("get request recieved, sending response..")

  res.json({
    message: "Request works.."
  });
});

//post requests
app.post("/upload", (req: Request, res: Response) => {
  console.log("post request recieved, sending response..")

  res.json({
    success: true,
    message: "Post request received"
  });
});

export default app;
