const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { sendMail } = require('../../controllers/sendMail');

jest.mock('nodemailer');
jest.mock('fs');

describe('sendMail function tests', () => {
  it('should send an email with the attachment successfully', async () => {
    // Mock the file read operation to return attachment content
    const attachmentContent = 'mock attachment content';
    fs.readFileSync.mockReturnValueOnce(attachmentContent);

    // Mock the nodemailer createTransport and sendMail methods
    const sendMailMock = jest.fn().mockResolvedValueOnce({ accepted: ['recipient@example.com'] });
    nodemailer.createTransport.mockReturnValueOnce({
      sendMail: sendMailMock,
    });

    // Mock request and response objects
    const req = {
      params: { requestId: 'REQ001' },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Call the sendMail function
    await sendMail(req, res);

    // Verify that the nodemailer createTransport and sendMail methods were called with the correct parameters
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.EMAIL,
      to: process.env.RES,
      subject: 'Request for Approval: Purchase Requisition',
      html: expect.any(String), // You can add more detailed checks for HTML content if needed
      attachments: [
        {
          filename: 'Purchase_Requisition.pdf',
          content: attachmentContent,
          contentType: 'application/pdf',
        },
      ],
    });

    // Verify that the response contains the success message
    expect(res.send).toHaveBeenCalledWith('Mail has been sent to your email. Check your mail');
  });

  it('should handle errors properly', async () => {
    // Mock the nodemailer createTransport and sendMail methods to throw an error
    nodemailer.createTransport.mockReturnValueOnce({
      sendMail: jest.fn().mockRejectedValueOnce(new Error('SMTP connection error')),
    });

    // Mock request and response objects
    const req = {
      params: { requestId: 'REQ002' },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Call the sendMail function
    await sendMail(req, res);

    // Verify that the nodemailer createTransport and sendMail methods were called with the correct parameters
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    // Verify that the response status is 500 and the appropriate error message is sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('An error occurred while sending the email.');
  });
});


