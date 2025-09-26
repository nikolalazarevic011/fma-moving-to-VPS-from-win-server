const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const dotenv = require("dotenv");

// Load the environment variables from .env.production
dotenv.config({ path: ".env.production" });

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000; // Change this to match your IIS port if needed
const hostname = "localhost";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, async () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
});
