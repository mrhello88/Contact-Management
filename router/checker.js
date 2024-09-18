const express = require("express");
const router = express.Router();
const checkerController = require("../controller/checker");
const downloadController = require("../controller/download");
const isLoggedIn = require("../middleware/isLoggedIn").isLoggedIn;
const zodChecker = require("../zodSchema/checker")
const zodValidation = require("../middleware/zod-authentication").authentication



router.get("/", checkerController.getHome);
router.get("/add", isLoggedIn, checkerController.getChecker);
router.post("/save",zodValidation(zodChecker), checkerController.postChecker);
// router.post("/pdfDownload",downloadController.postDownloads)
router.get("/download", isLoggedIn, downloadController.getDownload);
router.post("/download", downloadController.postDownload);

module.exports = router;
