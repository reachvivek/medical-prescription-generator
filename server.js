import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// HTML template for prescription
const getPrescriptionHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      padding: 40px;
      font-size: 11pt;
      line-height: 1.6;
      color: #111827;
    }

    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 120px;
      font-weight: bold;
      color: rgba(239, 68, 68, 0.1);
      z-index: 1000;
      pointer-events: none;
      letter-spacing: 0.2em;
    }

    .content {
      position: relative;
      z-index: 1;
    }

    .header {
      border-bottom: 2px solid #4b5563;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .clinic-name {
      font-size: 20pt;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .doctor-info {
      font-size: 10pt;
      color: #4b5563;
      line-height: 1.8;
    }

    .section {
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 13pt;
      font-weight: bold;
      margin-bottom: 8px;
      color: #111827;
    }

    .patient-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      font-size: 10pt;
    }

    .patient-grid .full-width {
      grid-column: 1 / -1;
    }

    .label {
      font-weight: bold;
    }

    .prescription-section {
      background-color: #f0f9ff;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .prescription-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .rx-badge {
      background-color: #0891b2;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10pt;
      font-weight: bold;
      margin-right: 8px;
    }

    .medication {
      background-color: white;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #bae6fd;
      margin-bottom: 12px;
    }

    .medication-name {
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .medication-details {
      font-size: 9pt;
      color: #4b5563;
      margin-bottom: 2px;
    }

    .medication-instructions {
      font-size: 9pt;
      color: #6b7280;
      font-style: italic;
    }

    .notes {
      font-size: 10pt;
      color: #4b5563;
      line-height: 1.8;
    }

    .footer {
      border-top: 2px solid #4b5563;
      padding-top: 15px;
      margin-top: 20px;
    }

    .signature-section {
      margin-top: 40px;
    }

    .signature-label {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .signature-name {
      font-style: italic;
      color: #6b7280;
      margin-top: 8px;
    }

    .date {
      font-size: 9pt;
      color: #9ca3af;
      margin-top: 15px;
    }

    @media print {
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="watermark">SAMPLE</div>

  <div class="content">
    <!-- Header -->
    <div class="header">
      <div class="clinic-name">City Medical Center</div>
      <div class="doctor-info">
        <div><strong>Dr. Sarah Johnson, MD</strong></div>
        <div>Specialty: Internal Medicine</div>
        <div>License: MED-123456</div>
        <div>Phone: +1 (555) 123-4567</div>
        <div>123 Medical Plaza, Suite 200, New York, NY 10001</div>
      </div>
    </div>

    <!-- Patient Information -->
    <div class="section">
      <div class="section-title">Patient Information</div>
      <div class="patient-grid">
        <div><span class="label">Name:</span> John Smith</div>
        <div><span class="label">Age:</span> 45 years</div>
        <div><span class="label">Gender:</span> Male</div>
        <div><span class="label">Contact:</span> +1 (555) 987-6543</div>
        <div class="full-width"><span class="label">Address:</span> 456 Oak Street, Brooklyn, NY 11201</div>
      </div>
    </div>

    <!-- Clinical Information -->
    <div class="section">
      <div class="section-title">Clinical Information</div>
      <div class="notes">
        <div><span class="label">Diagnosis:</span> Hypertension (Stage 1), Type 2 Diabetes Mellitus</div>
        <div><span class="label">Symptoms:</span> Elevated blood pressure, increased thirst, frequent urination</div>
        <div><span class="label">Lab Tests:</span> CBC, Lipid Panel, HbA1c, Fasting Blood Sugar</div>
      </div>
    </div>

    <!-- Prescription -->
    <div class="prescription-section">
      <div class="prescription-header">
        <span class="rx-badge">Rx</span>
        <span class="section-title" style="margin: 0;">Prescription</span>
      </div>

      <div class="medication">
        <div class="medication-name">1. Lisinopril 10mg</div>
        <div class="medication-details">Dosage: 1 tablet | Frequency: Once daily | Duration: 30 days</div>
        <div class="medication-instructions">Instructions: Take in the morning with water</div>
      </div>

      <div class="medication">
        <div class="medication-name">2. Metformin 500mg</div>
        <div class="medication-details">Dosage: 1 tablet | Frequency: Twice daily | Duration: 30 days</div>
        <div class="medication-instructions">Instructions: Take with meals</div>
      </div>

      <div class="medication">
        <div class="medication-name">3. Aspirin 81mg</div>
        <div class="medication-details">Dosage: 1 tablet | Frequency: Once daily | Duration: 30 days</div>
        <div class="medication-instructions">Instructions: Take after breakfast</div>
      </div>
    </div>

    <!-- Additional Notes -->
    <div class="section">
      <div class="section-title">Additional Notes</div>
      <div class="notes">
        • Monitor blood pressure daily<br>
        • Check blood sugar levels as directed<br>
        • Follow low-sodium, diabetic-friendly diet<br>
        • Regular exercise (30 minutes daily)<br>
        • Avoid alcohol and smoking
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div><span class="label">Follow-up Date:</span> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>

      <div class="signature-section">
        <div class="signature-label">Doctor's Signature</div>
        <div class="signature-name">Dr. Sarah Johnson, MD</div>
        <div class="date">Date: ${new Date().toLocaleDateString()}</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// PDF generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  let browser = null;

  try {
    console.log('Starting PDF generation...');

    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set content
    const html = getPrescriptionHTML(req.body);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    console.log('PDF generated successfully');

    // Send PDF
    res.contentType('application/pdf');
    res.send(pdf);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF', message: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PDF service is running' });
});

app.listen(PORT, () => {
  console.log(`PDF generation server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
