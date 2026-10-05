export default async function handler(req: any, res: any) {
  // Enable CORS for Vercel serverless deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const recipient = 'manirajkyatham@gmail.com';
    const host = req.headers['host'] || 'maniraj-kyatham-portfolio.vercel.app';
    const origin = req.headers['origin'] || req.headers['referer'] || `https://${host}`;

    let forwarded = false;
    let needsActivation = false;
    let responseNote = '';

    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referer': origin,
          'Origin': origin
        },
        body: JSON.stringify({
          name: String(name).trim(),
          email: String(email).trim(),
          _replyto: String(email).trim(),
          _subject: `[Portfolio Inquiry] ${subject || 'New Contact'} (from ${name})`,
          subject: String(subject || 'Portfolio Inquiry').trim(),
          message: String(message).trim(),
          _template: 'table',
          _captcha: 'false'
        })
      });

      const formSubmitData: any = await formSubmitRes.json().catch(() => null);

      if (formSubmitData) {
        if (formSubmitData.success === 'true' || formSubmitData.success === true) {
          forwarded = true;
          responseNote = 'Delivered directly to ' + recipient;
        } else if (
          typeof formSubmitData.message === 'string' &&
          formSubmitData.message.toLowerCase().includes('activation')
        ) {
          needsActivation = true;
          responseNote = 'FormSubmit activation email pending confirmation at ' + recipient;
        } else {
          responseNote = formSubmitData.message || 'FormSubmit returned pending status';
        }
      }
    } catch (deliveryErr: any) {
      console.error('Vercel API FormSubmit error:', deliveryErr);
    }

    return res.status(200).json({
      success: true,
      forwarded,
      needsActivation,
      recipient,
      note: responseNote,
      message: needsActivation
        ? `FormSubmit sent a 1-time activation link to ${recipient}. Please check your inbox (and spam) to click Activate Form.`
        : `Message received and dispatched to ${recipient}.`
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({ error: 'Failed to process message transmission' });
  }
}
