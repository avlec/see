const express = require("express");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
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

const logpath = path.join(__dirname, "access.log");
const logstream = fs.createWriteStream(logpath, { flags: "a" });

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION || 'NotSoSecretSession',
  saveUninitialized: false,
  resave: false
}));

// Don't use /tmp because trying to be Windows-friendly
// Note a future/production implementation would use global quotas
const uploadRoot = path.resolve(__dirname, 'see-uploads')
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : uploadRoot,
  limits: { fileSize: 50 * 1024 * 1024 },
}));

// Clear it on startup
if (fs.existsSync(uploadRoot)) fs.rmdirSync(uploadRoot);
fs.mkdirSync(uploadRoot);

// Routes for the application base
const clientDir = path.join(__dirname, "client");
const compiledWebpackFiles = path.join(clientDir, "build");
app.use("/", express.static(compiledWebpackFiles));

app.post("/uploadFiles", async (req, res) => {
  console.log("Receiving request from", req.sessionID);
  if (Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const userDir = path.join(uploadRoot, req.sessionID);
  if (await !fs.exists(userDir)) {
    await fs.mkdir(userDir);
  }
  if (!('files' in req.session)) {
    req.session.files = {};
  }
  // The keys of the `req.files` object is the POST `name` fields
  for (const file of req.files) {
    file.mv = promisify(file.mv);
    try {
      await file.mv(path.join(userDir, file.name));
    } catch (err) {
      return res.status(500).send(err);
    }
    // Store in their session, but remap it to filename rather than POST name
    req.session.files[file.name] = file;
  }
  res.send('Files uploaded');
});

// Rather than just take a buffer, pass the entire `fileupload` object:
// https://github.com/richardgirges/express-fileupload#usage
const filters = {
  checkFileSize: fileObject => {
    if (fileObject.size > 100 * 1024) { // 100kb
      return "Your file is too big"
    }
  },
  checkTypeAmbiguity: fileObject => {
    // TODO: Check extension, then check hashbang at the first line of the file
    // if possible... tell them if it's easy to tell what they have
  }
}

app.get("/runFileFilter/:filter/:filename", async (req, res) => {
  const { filter, filename } = req.params;
  if (!(filter in filters)) {
    res.status(404).send(`Filter ${filter} is unknown`);
  }
  if (!(filename in req.session.files)) {
    res.status(404).send(`You haven't uploaded the file "${filename}"`);
  }
  try {
    // Use `await` because a filter could take a while. Don't bother reading
    // from disk since session has them in memory. Disk is kinda for debugging
    // and perminence only
    const output = await filters[filter](req.session.files[filename]);
    return res.send(output);
  } catch {
    return res.status(500).send(
      `Filter ${filter} didn't complete for ${filename}...`);
  }
});

// This does NOT recursively call runFileFilter/. It's to filter the directory
// layout or filenames themselves...

// Not sure if it's useful. Only usecase I have in mind is "Do you have a
// readme.md file or a docs/ folder or a license?"
app.get("/runDirectoryFilter/:filter/:directory", () => {
  return res.status(501).send("Not implemented")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(new Date().toLocaleString());
  console.log(`Listening on ${port}\n`);
});
