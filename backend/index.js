const puppeteer = require('puppeteer');

async function generatePDF(url, outputFile) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        
        await page.goto(url);
        
        await page.pdf({ path: outputFile, format: "A4" });
        await browser.close();
    } catch (err) {
        console.log(err);
    }
}
const url="http://google.com"
const outputFile="output.pdf"
generatePDF(url,outputFile);
