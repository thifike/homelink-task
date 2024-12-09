// src/app.ts
import express, { Request as ExRequest, Response as ExResponse, json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./generated/routes";
import { errorHandler } from "./errorHandler";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

// Add Swagger UI
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(swaggerUi.generateHTML(await import("./generated/swagger.json")));
});

// Register TSOA routes
RegisterRoutes(app);

// 404 handler
app.use((_req, res: ExResponse) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// Global error handler
app.use(errorHandler);
