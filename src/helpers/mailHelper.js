const { createTransport } = require("nodemailer")
const ejs = require("ejs")
const templates = require("../templates/index")

let transporter

const setupTransport = async () => {
    try {
        transporter = createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port:587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        })
        const verifyRes = await transporter.verify()
        console.log("We can send mails: ", verifyRes);
    } catch (error) {
        console.log("Error while verifying transport ", error);
    }
}

const sendMail = async (templateName, mailOption, mailData) => {
    try {
        const html = ejs.render(templates[templateName], mailData)
        mailOption['html'] = html
        const response = await transporter.sendMail(mailOption) 
        return response
    } catch (error) {
        console.log("Error while sending mail ", error);
        throw error
    }
}

setupTransport()

module.exports = {
    createTransport,
    sendMail
}