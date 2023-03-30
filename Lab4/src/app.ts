import express, {Express} from 'express';
import bodyParser from 'body-parser';
import { tags } from './routes/tags';
import { tasks } from './routes/tasks';
const swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const app: Express = express()

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(tags);
app.use(tasks);

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
        },
        contact: {
          name: "Valide",
          url: "https://t.me/MrRicard0",
          email: "valide.baget@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.listen(8080, () =>{
    console.log("Server is listening on port 8080" )
})