import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Starting server implementation...");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let resBody: any;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    resBody = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (resBody) {
        logLine += ` :: ${JSON.stringify(resBody)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

(async () => {
  registerRoutes(app);

  // Serve static files in production
  const publicPath = path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(publicPath));

  // Handle SPA routing - serve index.html for any non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(publicPath, "index.html"), (err) => {
      if (err) {
        // If index.html is missing, just let it 404
        next();
      }
    });
  });



  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  const port = 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`API server running on port ${port}`);
  });
})();

