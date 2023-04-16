import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { tags } from "./routes/tags";
import { tasks } from "./routes/tasks";
import { projects } from "./routes/projects";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express()

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((res) => console.log("Connected to db"))
  .catch((error) =>console.log(error))

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(tags);
app.use(tasks);
app.use(projects);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "toDo Swagger",
      version: "0.1.0",
      description:
        "This is a simple toDo API application",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      }
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/swagger/*/*.ts"],
};

const specs = swaggerJsDoc(options);
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT)
})
