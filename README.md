# Horoscope PDF Generator

A professional Tamil horoscope PDF generator built with Node.js, Express, and Puppeteer. Generate beautifully formatted horoscope charts matching traditional Tamil astrology print formats.

## Features

- ✅ Professional Tamil horoscope layout
- ✅ Customizable business header with contact details
- ✅ Complete personal details section
- ✅ Rasi (Birth Chart) and Navamsa (9th Division) charts
- ✅ PDF generation with high-quality output
- ✅ Tamil font support
- ✅ Web-based input form
- ✅ REST API for programmatic access

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/nbalki/horoscope-pdf-generator.git
cd horoscope-pdf-generator

# Install dependencies
npm install
```

## Setup

### 1. Add Tamil Font

Download and place a Tamil font in the `fonts/` directory:

```bash
mkdir -p fonts
# Place NotoSansTamil-Regular.ttf in the fonts/ directory
```

You can download Noto Sans Tamil from [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+Tamil).

### 2. Add Astrologer Image (Optional)

Place your astrologer image in `assets/` directory if needed.

## Usage

### Start the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`

### Access the Application

1. **Web Form**: Visit `http://localhost:3000/` to access the input form
2. **Preview**: Visit `http://localhost:3000/preview` to see sample output
3. **Generate PDF**: POST JSON data to `http://localhost:3000/generate-pdf`

## API Usage

### Generate PDF via API

```bash
curl -X POST http://localhost:3000/generate-pdf \
  -H "Content-Type: application/json" \
  -d @sample-data.json \
  --output horoscope.pdf
```

### Sample Data Format

See `sample-data.json` for the complete data structure. Key fields include:

```json
{
  "business_name": "பாலமணி ஜோதிட சேவை",
  "name": "Balakrishnan",
  "birth_date": "1978-03-21",
  "birth_time": "06:45",
  "birth_place": "Puducherry",
  "rasi": {
    "1": "",
    "2": "",
    ...
  },
  "navamsa": {
    "1": "",
    ...
  }
}
```

## File Structure

```
horoscope-pdf-generator/
├── server.js              # Express server
├── package.json           # Dependencies
├── sample-data.json       # Sample horoscope data
├── templates/
│   └── horoscope.html    # EJS template for PDF
├── public/
│   └── index.html        # Web input form
├── assets/
│   └── Horoscope Format.jpg  # Background reference image
└── fonts/
    └── NotoSansTamil-Regular.ttf  # Tamil font
```

## Customization

### Business Information

Edit the default values in `sample-data.json` or pass them through the API:

- `business_name`: Your astrology service name
- `english_name`: Astrologer name
- `phone_numbers`: Contact numbers
- `address_line1`, `address_line2`, `address_line3`: Address details
- `timings`: Service hours

### Chart Data

The `rasi` and `navamsa` objects use positions 1-12 corresponding to the 12 houses:
- Position 1-12 represents each house in the chart
- Enter planet/zodiac names in Tamil or English
- Use `\n` for line breaks within cells

### Styling

Modify `templates/horoscope.html` to customize:
- Colors and borders
- Font sizes
- Layout spacing
- Grid dimensions

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

3. Deploy:
```bash
vercel
```

### Heroku Deployment

1. Create `Procfile`:
```
web: node server.js
```

2. Deploy:
```bash
git add .
git commit -m "Deploy to Heroku"
heroku create your-app-name
git push heroku main
```

### Docker Deployment

1. Create `Dockerfile`:
```dockerfile
FROM node:14
RUN apt-get update && apt-get install -y chromium
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

2. Build and run:
```bash
docker build -t horoscope-generator .
docker run -p 3000:3000 horoscope-generator
```

## Troubleshooting

### Puppeteer Issues

If you encounter Puppeteer/Chromium issues:

```bash
# Install required dependencies (Ubuntu/Debian)
sudo apt-get install -y chromium-browser

# Or use bundled Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npm install
```

### Font Not Loading

Ensure the font path in `templates/horoscope.html` matches your font file:
```css
src: url('/fonts/NotoSansTamil-Regular.ttf') format('truetype');
```

### Memory Issues

For large-scale PDF generation, increase Node.js memory:
```bash
node --max-old-space-size=4096 server.js
```

## Development

### Run in Development Mode

```bash
# Install nodemon
npm install -g nodemon

# Run with auto-reload
nodemon server.js
```

### Testing

Test the preview endpoint:
```bash
curl http://localhost:3000/preview
```

Test PDF generation:
```bash
curl -X POST http://localhost:3000/generate-pdf \
  -H "Content-Type: application/json" \
  -d @sample-data.json \
  --output test.pdf
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your astrology business!

## Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

- Built with Express.js and Puppeteer
- Tamil font support via Noto Sans Tamil
- Designed for traditional Tamil astrology format
