const { sendMail } = require("../../helpers/mailHelper");
// const pdf = require('html-pdf');
const puppeteer = require("puppeteer")
const ejs = require("ejs")
const templates = require("../../templates/index")

const sendRequestedAppraisal = async (req, res) => {
  try {
    const mailData = req.body
    const attachments = []
    if (mailData.template_name === "maintananceRequestForm" || mailData.template_name === "rentalApplicationForm") {
      const html = ejs.render(templates[mailData.template_name], mailData)
      const pdfBuffer = await htmlToPdfBuffer(html)
      const filename = mailData.template_name === "maintananceRequestForm" ? `Maintenance Request - ${mailData.currentDate}.pdf` : `Rental Application - ${mailData.currentDate}.pdf`
      attachments.push({ content: pdfBuffer, filename: filename, })
      mailData["formType"] = mailData.template_name === "maintananceRequestForm" ? "Maintenance Request" : "Rental Application"
      mailData.template_name = "attachmentTemplate"
    }
    if (mailData.uploadDocument) {
      attachments.push({ path: mailData.uploadDocument })
    }
    if (mailData.images && mailData.images.length) {
      mailData.images.forEach(element => {
        attachments.push({path: element?.path, filename: element?.fileName})
      });
    }
    const mailRes = await sendMail(
      mailData.template_name,
      {
        to: mailData.send_to,
        cc: mailData.send_cc || "",
        // to: "dev08.scriptus@gmail.com",
        // to: "dhanani.vishwas@gmail.com",
        // cc: "dev13.scriptus@gmail.com",
        subject: mailData.subject,
        attachments,
      },
      mailData
    );

    return res.status(200).json({
      data: mailRes,
    });
  } catch (error) {
    console.log("sendRequestedAppraisal error ==>", error);
    return res.status(400).json({
      error,
    });
  }
};

const htmlToPdfBuffer = async (html) => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    // defaultViewport: {
    //   height: 5000,
    //   width: 3508
    // }
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');
  const [pageHeight, pageWidth] = await page.evaluate(() => [
    Math.max(
      document.documentElement.offsetHeight,
      document.documentElement.scrollHeight,
    ),
    Math.max(
      document.documentElement.offsetWidth,
      document.documentElement.scrollWidth,
    ),
  ]);

  const pdfStream = await page.pdf({
    // path: `./src/assets/${fileName}`
    format: "A4",
    // height: pageHeight ? (pageHeight + 10) + 'px' : '432mm',
    // width: pageWidth ? (pageWidth + 10) + 'px' : '239mm',
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  // const pdfStream = await createReadStream(`./src/assets/${fileName}`)
  // const pdfBuffer = await readFileSync(`./src/assets/${fileName}`);
  // if (existsSync(`./src/assets/${fileName}`)) {
  //   unlinkSync(`./src/assets/${fileName}`);
  // }
  // return pdfBuffer;
  return pdfStream
}
module.exports = {
  sendRequestedAppraisal,
};
