const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static(path.join(__dirname, 'public')));

// Serve assets folder where we'll point to the uploaded scan and fonts
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.set('views', path.join(__dirname, 'templates'));
app.engine('html', ejs.renderFile);

// Simple preview (renders HTML with data)
app.get('/preview', async (req, res) => {
  const data = req.query.data ? JSON.parse(req.query.data) : require('./sample-data.json');
  res.render('horoscope.html', { data });
});

// PDF generation endpoint
app.post('/generate-pdf', async (req, res) => {
  const data = req.body || require('./sample-data.json');
  try {
    const templateHtml = await ejs.renderFile(path.join(__dirname, 'templates','horoscope.html'), { data });

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Provide html content and ensure local assets (fonts & images) resolve
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' });

    // Set media as print to respect @page rules
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '8mm', bottom: '8mm', left: '8mm', right: '8mm' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': `attachment; filename="horoscope.pdf"`
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
