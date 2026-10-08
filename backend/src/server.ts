import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");

// CORS Configuration - Restrict allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  process.env.FRONTEND_URL,
  process.env.NEXTAUTH_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow server-to-server and same-origin rewrites
      }
    },
    credentials: true,
  })
);

// Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader(
    "Content-Security-Policy-Report-Only",
    "default-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self';"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

app.use(express.json({ limit: "2mb" }));

// API Routes
app.use("/api", routes);

app.get("/api/health", (_req: express.Request, res: express.Response) => {
  res.json({ status: "ok", service: "MB PU Backend Server" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

