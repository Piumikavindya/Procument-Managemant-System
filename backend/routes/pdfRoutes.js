const express = require('express')
const { createPdf, fetchPdf, sendPdf ,getPdf} = require('../controllers/pdfController')
const pdfRoute = express.Router()

pdfRoute.post('/createPdf',createPdf) // to generate pdf 

pdfRoute.get('/fetchPdf',fetchPdf) // to fetch the generated pdf

pdfRoute.post('/sendPdf',sendPdf) //sent pdf to mail 
pdfRoute.get('/getPdf/:filename',sendPdf) //sent pdf to mail 

module.exports = pdfRoute