// EXAMPLE 1:  Directory name formation 
const testing = async (req, res) => {
    try {
      const { base64pdf, filename } = req.body;
      const storage = new GoogleStorage();
      const baseDir = path.join(process.cwd(), "tmp");
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      const pdfPath = path.join(baseDir, filename);
      let nameFile = filename.split(".");
      await createFilePDF(base64pdf, pdfPath);
  
    } catch (error) {
      logger.error({msgError:error.msg},"Error")
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: true,
      })
    }
  }
  
  // EXAMPLE 2: Simple file write in a user specified path
  module.exports  = async function createFileFromBase64(base64String, dstPathname){
    // ruleid: javascript-063-lack-of-data-validation-pathtraversal
    fs.writeFileSync(dstPathname, base64String, {
      encoding: "base64",
    });
  };
  
  // EXAMPLE 3: Dynamic module load.
  function loadModule(req) {
      const mod = req.query.m; // SOURCE
      const modulePath = "./modules/" + mod; // TAINT
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      return require(modulePath); // SINK (arbitrary file load)
  }
  
  // EXAMPLE 4: Simple write (not async)
  function saveLog(req) {
      const file = req.body.logName; // SOURCE
      const content = req.body.data;
      const target = "/var/logs/" + file;  // PROPAGATION
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      fs.writeFile(target, content, () => {}); // SINK
  }
  
  // EXAMPLE 5: express.sendFile
  function download(req, res) {
      const name = req.params.filename; // SOURCE
      const target = "./files/" + name; // PROPAGATION
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      res.sendFile(target); // SINK
  }
  
  // EXAMPLE 6: 
  function serveFile(req, res) {
      const userPath = req.body.path; // SOURCE
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      const finalPath = path.join(__dirname, "public", userPath); // STILL TAINTED
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      fs.createReadStream(finalPath).pipe(res);  // SINK
  }
  
  // EXAMPLE 7: 
  const fs = require("fs");
  
  function readUserFile(req, res) {
      const filename = req.query.file; // SOURCE
      const fullPath = "./uploads/" + filename; // TAINT PROPAGATION
      // ruleid: javascript-063-lack-of-data-validation-pathtraversal
      fs.readFile(fullPath, (err, data) => {      // SINK (path traversal)
          if (err) return res.status(500).send("Error");
          res.send(data);
      });
  }
  