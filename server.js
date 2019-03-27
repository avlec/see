const fs = require("fs-extra");
const path = require("path");
const { promisify } = require("util");
const { spawnSync } = require("child_process");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

// XXX: Likely remove for prod
process.on("unhandledRejection", (reason, promise) => {
  console.error("Uncaught error in", promise);
  console.error(reason);
  process.exit(1);
});

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION || "NotSoSecretSession",
  saveUninitialized: false,
  resave: false
}));

// Don't use /tmp because trying to be Windows-friendly
// Note a future/production implementation would use global quotas
const uploadRoot = path.resolve(__dirname, "see-uploads");
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : uploadRoot,
  limits: { fileSize: 50 * 1024 * 1024 }
}));

// Clear it on startup
if (fs.existsSync(uploadRoot)) fs.emptyDirSync(uploadRoot);

// Routes for the application base
const clientDir = path.join(__dirname, "client");
const compiledWebpackFiles = path.join(clientDir, "build");
app.use("/", express.static(compiledWebpackFiles));

// Initialize a session for anyone who goes beyond the "/" page
app.use((req, res, next) => {
  if (!("files" in req.session)) {
    req.session.files = {};
  }
  return next();
});

app.post("/uploadFiles", async (req, res) => {
  console.log("Receiving request from", req.sessionID);
  if (!("files" in req) || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files uploaded");
  }
  const userDir = path.join(uploadRoot, req.sessionID);
  const exists = await fs.exists(userDir);
  if (!exists) {
    console.log("Creating directory", userDir);
    await fs.mkdir(userDir);
  }
  // The keys of the `req.files` object is the POST `name` fields
  const files = Object.values(req.files);
  let replaceCount = 0;
  for (const file of files) {
    file.mv = promisify(file.mv);
    const absPath = path.join(userDir, file.name);
    try {
      if (await fs.exists(absPath)) replaceCount++;
      await file.mv(absPath);
    } catch (err) {
      return res.status(500).send(err);
    }
    // Store in their session, but remap it to filename rather than POST name
    file.absPath = absPath;
    req.session.files[file.name] = file;
  }
  res.send(`${files.length - replaceCount} uploaded; ${replaceCount} replaced`);
});

// For filters that aren't in JS
// runExternalFilter(`java -cp bin:algs4.jar -ea MyFilter ${pathOnDisk}`)
const runExternalFilter = command => {
  const [ binary, ...args ] = command.split(" ");
  const { stdout, stderr } = spawnSync(binary, args, {
    stdio: ["ignore", "pipe", "pipe"], // In, Out, Err
    encoding: "utf8"
  });
  // TODO: How to handle stderr? Need to define the interface for a filter...
  return stdout || stderr;
};

// Rather than just take a buffer, pass the entire `fileupload` object:
// https://github.com/richardgirges/express-fileupload#usage
const filters = {
  checkFileSize(fileObject) {
    if (fileObject.size > 100 * 1024) { // 100kb
      return "Your file very large. Consider refactoring your code";
    }
  },
  checkTypeAmbiguity(fileObject) {
    // TODO: Check extension, then check hashbang at the first line of the file
    // if possible... tell them if it's easy to tell what they have
  },
  runPythonLint(fileObject) {
    const command = `python3 filters/myFilter.py ${fileObject.absPath}`;
    return runExternalFilter(command);
  }
};

app.get("/runFileFilter/:filter/:filename", async (req, res) => {
  const { filter, filename } = req.params;
  if (!(filter in filters)) {
    return res.status(404).send(`Filter ${filter} is unknown`);
  }
  if (!(filename in req.session.files)) {
    return res.status(404).send(`You haven't uploaded the file "${filename}"`);
  }
  try {
    // Use `await` because a filter could take a while. Don't bother reading
    // from disk since session has them in memory. Disk is kinda for debugging
    // and perminence only
    const output = await filters[filter](req.session.files[filename]);
    return res.send(output);
  } catch (err) {
    return res.status(500).send(
      `Filter ${filter} didn't complete for ${filename}: ${err}`);
  }
});

// This does NOT recursively call runFileFilter/. It's to filter the directory
// layout or filenames themselves...

// Not sure if it's useful. Only usecase I have in mind is "Do you have a
// readme.md file or a docs/ folder or a license?"
app.get("/runDirectoryFilter/:filter/:directory", (req, res) => {
  return res.status(501).send("Not implemented");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(new Date().toLocaleString());
  console.log(`Listening on ${port}\n`);
});
