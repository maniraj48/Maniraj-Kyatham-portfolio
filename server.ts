import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getOfflineAssistantReply } from './src/utils/offlineAssistant';

dotenv.config();

// Resilient path resolution for dev (ESM) and build (CJS)
const __currentFilename = typeof import.meta !== 'undefined' && import.meta.url ? fileURLToPath(import.meta.url) : '';
const currentDir = typeof __dirname !== 'undefined' ? __dirname : (__currentFilename ? path.dirname(__currentFilename) : process.cwd());

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // API Route: Upload and save authentic portrait image
  app.post('/api/upload-portrait', async (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== 'string') {
        return res.status(400).json({ error: 'imageBase64 string is required' });
      }

      // Extract base64 payload
      const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      const base64Data = matches ? matches[2] : imageBase64;
      const buffer = Buffer.from(base64Data, 'base64');

      // Ensure public directory exists
      const publicDir = path.join(currentDir, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // Write authentic image to public directory
      const portraitPath = path.join(publicDir, 'maniraj-portrait.jpg');
      const pngPath = path.join(publicDir, 'image.png');
      fs.writeFileSync(portraitPath, buffer);
      fs.writeFileSync(pngPath, buffer);

      // Also sync to dist if present
      const distDir = path.join(currentDir, 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'maniraj-portrait.jpg'), buffer);
        fs.writeFileSync(path.join(distDir, 'image.png'), buffer);
      }

      console.log('Successfully saved authentic portrait image to disk.');
      return res.json({
        success: true,
        message: 'Portrait updated successfully',
        timestamp: Date.now()
      });
    } catch (err: any) {
      console.error('Failed to save portrait:', err);
      return res.status(500).json({ error: 'Failed to save portrait image' });
    }
  });

  // API Route: Contact Form Dispatcher
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const recipient = 'manirajkyatham@gmail.com';
      const timestamp = new Date().toISOString();
      const messageEntry = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: String(name).trim(),
        email: String(email).trim(),
        subject: String(subject || 'Portfolio Inquiry').trim(),
        message: String(message).trim(),
        timestamp
      };

      // 1. Save locally so messages are permanently preserved
      try {
        const dataDir = path.join(currentDir, 'data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        const messagesFile = path.join(dataDir, 'messages.json');
        let existing: any[] = [];
        if (fs.existsSync(messagesFile)) {
          try {
            existing = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
          } catch {
            existing = [];
          }
        }
        existing.unshift(messageEntry);
        fs.writeFileSync(messagesFile, JSON.stringify(existing.slice(0, 100), null, 2), 'utf8');
      } catch (saveErr) {
        console.error('Failed to log message locally:', saveErr);
      }

      // 2. Forward to FormSubmit to email directly to manirajkyatham@gmail.com
      let forwarded = false;
      let needsActivation = false;
      let responseNote = '';

      try {
        const reqOrigin = (req.headers.origin as string) || (req.headers.referer as string) || 'https://maniraj-kyatham-portfolio.vercel.app';
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Referer': reqOrigin,
            'Origin': reqOrigin
          },
          body: JSON.stringify({
            name: messageEntry.name,
            email: messageEntry.email,
            _replyto: messageEntry.email,
            _subject: `[Portfolio Inquiry] ${messageEntry.subject} (from ${messageEntry.name})`,
            subject: messageEntry.subject,
            message: messageEntry.message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const formSubmitData: any = await formSubmitRes.json().catch(() => null);
        if (formSubmitData) {
          if (formSubmitData.success === 'true' || formSubmitData.success === true) {
            forwarded = true;
            responseNote = 'Delivered directly to ' + recipient;
          } else if (typeof formSubmitData.message === 'string' && formSubmitData.message.toLowerCase().includes('activation')) {
            needsActivation = true;
            responseNote = 'FormSubmit activation email pending confirmation at ' + recipient;
          }
        }
      } catch (fetchErr) {
        console.error('FormSubmit delivery error:', fetchErr);
      }

      return res.json({
        success: true,
        saved: true,
        forwarded,
        needsActivation,
        recipient,
        note: responseNote,
        message: needsActivation
          ? `Message received and logged! FormSubmit sent an activation link to ${recipient}. Once confirmed in your inbox, submissions forward automatically.`
          : `Message received and routed to ${recipient}.`,
        entry: messageEntry
      });
    } catch (err: any) {
      console.error('Error in /api/contact:', err);
      return res.status(500).json({ error: 'Failed to process message transmission' });
    }
  });

  // API Route: View logged messages
  app.get('/api/contact/messages', (req, res) => {
    try {
      const messagesFile = path.join(currentDir, 'data', 'messages.json');
      if (fs.existsSync(messagesFile)) {
        const data = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        return res.json({ messages: data });
      }
      return res.json({ messages: [] });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  });

  // API Route: Local Portfolio Assistant (Zero External APIs, Zero API Keys Required)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const replyText = getOfflineAssistantReply(message);
      return res.json({ reply: replyText, isOffline: true });
    } catch (error: any) {
      console.error('Error in /api/chat route:', error);
      return res.json({
        reply: "Maniraj is a Python & Backend Developer with expertise in FastAPI, Flask, SQLite, PostgreSQL, and Machine Learning. Check out the Projects and Experience sections to explore his work!",
        isOffline: true
      });
    }
  });

  // Serve public static assets with priority (PDFs, images, fonts)
  const publicDir = path.join(currentDir, 'public');
  app.use(express.static(publicDir));

  // Dedicated explicit routes for authentic resume PDF
  app.get('/Maniraj_Kyatham_Resume.pdf', (req, res) => {
    const pdfPath = path.join(publicDir, 'Maniraj_Kyatham_Resume.pdf');
    if (fs.existsSync(pdfPath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="Maniraj_Kyatham_Resume.pdf"');
      return res.sendFile(pdfPath);
    }
    return res.status(404).send('PDF not found');
  });

  app.get('/api/resume/download', (req, res) => {
    const pdfPath = path.join(publicDir, 'Maniraj_Kyatham_Resume.pdf');
    if (fs.existsSync(pdfPath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Maniraj_Kyatham_Resume.pdf"');
      return res.sendFile(pdfPath);
    }
    return res.status(404).json({ error: 'Resume PDF not found' });
  });

  app.get('/api/resume/view', (req, res) => {
    const pdfPath = path.join(publicDir, 'Maniraj_Kyatham_Resume.pdf');
    if (fs.existsSync(pdfPath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="Maniraj_Kyatham_Resume.pdf"');
      return res.sendFile(pdfPath);
    }
    return res.status(404).json({ error: 'Resume PDF not found' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(currentDir, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
