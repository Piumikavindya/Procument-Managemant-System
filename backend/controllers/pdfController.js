const pdf = require('html-pdf');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdfTemplate = require("../documents/document");
const env = require('dotenv');
env.config();
const filePath = path.join(__dirname, '..','download', 'invoice.pdf');

exports.createPdf = (req, res) => {
    const options = {
        format: 'A4' // Set the format to A4
    };

    pdf.create(pdfTemplate(req.body), options).toFile(filePath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error generating PDF');
        }
        res.send('PDF generated successfully');
    });
};

exports.fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '..','download','invoice.pdf'));
};

exports.sendPdf = async (req, res) => {
    try {
        const pathToAttachment =  path.join(__dirname, '..', 'download','invoice.pdf');
        const attachment = fs.readFileSync(pathToAttachment);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'Gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        // Use async/await to send email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Pdf Generate document',
            html: `
            Testing Pdf Generate document, Thanks.`,
            attachments: [{
                filename: 'invoice.pdf',
                content: attachment,
                contentType: 'application/pdf'
            }]
        });

        res.send("Mail has been sent to your email. Check your mail");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while sending the email.");
    }
};
