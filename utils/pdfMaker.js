const PDFDocument = require('pdfkit');
const fs = require('fs');

const pdfMaker = (data, path, res) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path));
    doc.pipe(res);

    // Function to add table headers
    const addTableHeaders = (doc) => {
        doc.fontSize(10)
            .text('Sr', 50, 50)
            .text('Name', 75, 50)
            .text('Phone', 175, 50)
            .text('Province', 250, 50)
            .text('District', 375, 50)
            .text('Date', 485, 50);

        doc.moveTo(50, 70).lineTo(550, 70).stroke();
    };

    let y = 90; // Start position for rows below headers
    let sr = 1;  // Initialize serial number
    let pageCounter = 0; // Counter to manage page breaks and header placement
    let maxRowsPerPage = 31; // Max rows per page before adding a new page

    // Initial page
    addTableHeaders(doc);

    data.forEach(item => {
        // Check if the next row will go beyond the page and move to a new page if necessary
        if (y + 20 > doc.page.height - 50 || sr % maxRowsPerPage === 0) {
            doc.addPage();
            y = 90; // Reset y position for the new page

            // Decide whether to add headers based on current page count
            pageCounter++;
            if (pageCounter % 1 === 0) { // After every 7 pages, add headers again
                addTableHeaders(doc);
                y = 90; // Reset y position after adding headers
            }
        }

        doc.fontSize(10).text(sr, 50, y)
            .text(item.name, 75, y)
            .text(item.mobile, 175, y)
            .text(item.province, 250, y)
            .text(item.district, 375, y)
            .text(item.createdAt, 485, y);

        y += 20; // Move down for the next row
        sr++;    // Increment serial number
    });

    doc.end();
};

module.exports = pdfMaker;
