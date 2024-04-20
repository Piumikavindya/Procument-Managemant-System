const express = require('express')
const { createPdf, fetchPdf, sendPdf, viewPdf } = require('../controllers/pdfController')
const pdfRoute = express.Router()

pdfRoute.post('/createPdf',createPdf) // to generate pdf 

pdfRoute.get('/fetchPdf/:requestId',fetchPdf) // to fetch the generated pdf

pdfRoute.post('/sendPdf/:requestId/:sendTo',sendPdf) //sent pdf to mail 
pdfRoute.get("/viewPdf/:requestId" ,viewPdf)

module.exports = pdfRoute