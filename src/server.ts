import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import cors from "cors";

const app = express();
const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

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

//fetch for unverified students
app.get("/fetch/verify", (req: Request, res: Response) => {
  console.log("fetch got!");

  res.json([
    {
      id: "101",
      idNumber: "123456",
      name: "Koi",
      program: "BSCS",
      personalEmail: "koi@gmail.com",
      umEmail: "koi@umindanao.edu.ph",
      status: "pending", 
    },
    {
      id: "102",
      idNumber: "987654",
      name: "Rui",
      program: "BSM",
      personalEmail: "rui@gmail.com",
      umEmail: "rui@umindanao.edu.ph",
      status: "pending", 
    },
    {
      id: "103",
      idNumber: "345921",
      name: "Rin",
      program: "Magiciology",
      personalEmail: "rin@gmail.com",
      umEmail: "rin@umindanao.edu.ph",
      status: "pending", 
    }
  ]);
});

//post requests
app.post("/post/verify", async (req: Request, res: Response) => {
  console.log("got verification request!");

  try {
    const body = req.body;
    console.log(body);

    if (!body.id) {
      throw new Error("Student ID is required!");
    }

    res.json({
      status: "Success!"
    });
  } catch (err) {
    console.error("Error: ", err);

    res.status(500).json({
      status: "Invalid!",
    });
  }
});

app.post("/api/submit", async (req: Request, res: Response) => {
  console.log("post request recieved, sending response..")

  try {
    const body = req.body;
    console.log(body);

    if (!body.id) {
      throw new Error("Student ID is required!");
    }

    const student = await prisma.student.create({
      data: {
        school_email: body.school_email,
        personal_email: body.personal_email,
        last_name: body.last_name,
        first_name: body.first_name,
        mid_name: body.middle_name,
        suffix: body.suffix,
        nickname: body.nickname,
        birth_date: new Date(body.birthdate),
        course: body.academics.course,
        major: body.academics.major,
        thesis_title: body.academics.thesis,

        //student_id
        studentNumber: {
          create: {
            student_number: parseInt(body.id),
            is_verified: false,
          },
        },
        //TODO: add more required data later on..
      },
    });

    console.log("student added: ", student);

    return res.json({
      status: "Success",
    });

  } catch (err) {
    console.error(`Error: ${err}`);

    res.status(500).json({
      status: "Error",
      message: "Server error nyae",
    });
  }
});

export default app;
