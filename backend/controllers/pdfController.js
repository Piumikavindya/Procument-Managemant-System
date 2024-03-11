const pdf = require('html-pdf');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdfTemplate = require("../documents/document");
const env = require('dotenv');
env.config();
const filePath = path.join(__dirname, '..','download', 'Purchase Requisition.pdf');

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
    res.sendFile(path.join(__dirname, '..','download','Purchase Requisition.pdf'));
};

exports.sendPdf = async (req, res) => {
    try {
        // Ensure that department is properly retrieved from req.body

        const pathToAttachment =  path.join(__dirname, '..', 'download','Purchase Requisition.pdf');
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
            subject: 'Request for Approval: Purchase Requisition',
            html: `
            <p>Dear Sir/Madam,</p>

            <p>We are submitting this purchase requisition form to request approval for the procurement of necessary items for department. The items listed in the form are essential for continuing academic activities in the department. Your timely approval will enable us to proceed with the procurement process efficiently.</p>
        
            <p><strong>Thank you</strong> for your attention to this matter.</p>
        
            <p><strong>Best regards,</strong><br>
            department</p> `,
            attachments: [{
                filename: 'Purchase Requisition.pdf',
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

