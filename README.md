# Horoscope PDF Generator (MVP)

This repository contains a minimal Node.js + Express + Puppeteer app that renders a Tamil horoscope print sheet to PDF.

## Files
- `server.js` — Express server with `/preview` and `/generate-pdf`.
- `templates/horoscope.html` — EJS HTML template sized to A4 with absolute mm coordinates.
- `sample-data.json` — Example JSON payload.
- `assets/Horoscope Format.jpg` — (copied from your upload).
- `fonts/` — Place a Tamil TTF here (e.g., NotoSansTamil-Regular.ttf).

## How to run locally
1. Install dependencies: `npm install`
2. Place a Tamil font: `fonts/NotoSansTamil-Regular.ttf`
3. Start server: `node server.js`
4. Preview: `http://localhost:3000/preview`
5. Generate PDF: POST JSON to `http://localhost:3000/generate-pdf` (see earlier README in the app).

## Notes
- The template uses the uploaded scanned sheet as a faint background to help align fields.
- Adjust coordinates in `templates/horoscope.html` for pixel-perfect alignment.
