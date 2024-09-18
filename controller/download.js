const checker = require("../model/checker");
// const FromTo = require("../utils/checker")
const pdfMaker = require("../utils/pdfMaker");

const path = require("path");

exports.getDownload = (req, res, next) => {
  res.render("download/DSelect.ejs", {
    pageTitle: "Download",
    path: "/download",
  });
};

exports.postDownload = (req, res, next) => {
  const { province, district } = req.body;
  const user = req.user;
  checker
    .find({ userId: user, district, province })
    .then((doc) => {
      const filename = `${district}.pdf`;
      const pathPdf = path.join("data", "pdfs", filename);

      // res.setHeader("content-Type", "application/pdf");
      // res.setHeader(
      //   "content-Disposition",
      //   `attachment; filename=${district}.pdf`
      // );
      return pdfMaker(doc, pathPdf, res);
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

// exports.postDownloads = (req, res, next) => {
// //   res.render("download/download.ejs");
// const {from,to, district} = req.body
// const value = FromTo(from,to);
// if(value){
//     checker.find({ district, province }).then((doc)=>{
//         const count = doc.length

//      });
// }

// console.log(value,district)
// // console.log(from,to)
// };
