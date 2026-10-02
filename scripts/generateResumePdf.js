import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Set metadata so PDF viewers display genuine document properties
  pdfDoc.setTitle('Maniraj Kyatham - Resume');
  pdfDoc.setAuthor('Maniraj Kyatham');
  pdfDoc.setSubject('Resume / Curriculum Vitae of Maniraj Kyatham');
  pdfDoc.setKeywords(['Software Developer', 'Backend', 'Python', 'FastAPI', 'AI/ML', 'Resume']);
  pdfDoc.setCreator('LaTeX / pdf-lib');
  pdfDoc.setProducer('Maniraj Kyatham Portfolio');
  
  // US Letter: 612 x 792 pt (8.5 x 11 in)
  const pageWidth = 612;
  const pageHeight = 792;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const leftMargin = 40;
  const rightMargin = 40;
  const contentWidth = pageWidth - leftMargin - rightMargin; // 532 pt
  const textColor = rgb(0.08, 0.08, 0.08);
  const lineRuleColor = rgb(0.2, 0.2, 0.2);

  let currentY = pageHeight - 40; // Start at 752

  // Helper to wrap text into lines
  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Draw Header
  const name = 'Maniraj Kyatham';
  const nameSize = 22;
  const nameWidth = fontBold.widthOfTextAtSize(name, nameSize);
  page.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y: currentY,
    size: nameSize,
    font: fontBold,
    color: textColor,
  });

  currentY -= 17;

  const contactLine1 = '+91 99494 47302 | manirajkyatham@gmail.com | linkedin.com/in/maniraj-kyatham | github.com/maniraj48 |';
  const contact1Size = 9.2;
  const contact1Width = fontRegular.widthOfTextAtSize(contactLine1, contact1Size);
  page.drawText(contactLine1, {
    x: (pageWidth - contact1Width) / 2,
    y: currentY,
    size: contact1Size,
    font: fontRegular,
    color: textColor,
  });

  currentY -= 13;

  const contactLine2 = 'Hyderabad, Telangana';
  const contact2Size = 9.2;
  const contact2Width = fontRegular.widthOfTextAtSize(contactLine2, contact2Size);
  page.drawText(contactLine2, {
    x: (pageWidth - contact2Width) / 2,
    y: currentY,
    size: contact2Size,
    font: fontRegular,
    color: textColor,
  });

  currentY -= 16;

  // Helper for Section Titles
  function drawSectionHeader(title) {
    currentY -= 4;
    page.drawText(title, {
      x: leftMargin,
      y: currentY,
      size: 10.5,
      font: fontBold,
      color: textColor,
    });
    currentY -= 3.5;
    page.drawLine({
      start: { x: leftMargin, y: currentY },
      end: { x: pageWidth - rightMargin, y: currentY },
      thickness: 0.65,
      color: lineRuleColor,
    });
    currentY -= 10;
  }

  // --- SUMMARY ---
  drawSectionHeader('SUMMARY');
  const summaryText =
    'Final-year B.Tech (IT) student, CGPA 8.36, with hands-on experience building scalable, reusable software using Python, Java, FastAPI, Flask, REST APIs, SQL and machine learning. Shipped end-to-end projects spanning backend development, database design and AI-driven features, with a strong foundation in OOP, data structures & algorithms, and software engineering practices.';
  const summaryLines = wrapText(summaryText, contentWidth, fontRegular, 9.2);
  for (const line of summaryLines) {
    page.drawText(line, {
      x: leftMargin,
      y: currentY,
      size: 9.2,
      font: fontRegular,
      color: textColor,
    });
    currentY -= 11.5;
  }

  // --- EDUCATION ---
  currentY -= 4;
  drawSectionHeader('EDUCATION');

  // ACE Engineering College
  page.drawText('ACE Engineering College', {
    x: leftMargin,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: textColor,
  });
  const loc1 = 'Hyderabad, Telangana';
  const loc1Width = fontRegular.widthOfTextAtSize(loc1, 9.5);
  page.drawText(loc1, {
    x: pageWidth - rightMargin - loc1Width,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: textColor,
  });
  currentY -= 11;

  page.drawText('B.Tech in Information Technology — CGPA: 8.36', {
    x: leftMargin,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  const yr1 = '2023–2027';
  const yr1Width = fontItalic.widthOfTextAtSize(yr1, 9);
  page.drawText(yr1, {
    x: pageWidth - rightMargin - yr1Width,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  currentY -= 12;

  // Raghava Laxmi Devi Govt. Junior College
  page.drawText('Raghava Laxmi Devi Govt. Junior College', {
    x: leftMargin,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: textColor,
  });
  const loc2 = 'Hyderabad, Telangana';
  const loc2Width = fontRegular.widthOfTextAtSize(loc2, 9.5);
  page.drawText(loc2, {
    x: pageWidth - rightMargin - loc2Width,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: textColor,
  });
  currentY -= 11;

  page.drawText('Intermediate (MPC) — 95%', {
    x: leftMargin,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  const yr2 = '2021–2023';
  const yr2Width = fontItalic.widthOfTextAtSize(yr2, 9);
  page.drawText(yr2, {
    x: pageWidth - rightMargin - yr2Width,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  currentY -= 13;

  // --- EXPERIENCE ---
  currentY -= 3;
  drawSectionHeader('EXPERIENCE');

  // AI & Data Analytics Intern
  page.drawText('AI & Data Analytics Intern', {
    x: leftMargin,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: textColor,
  });
  const expDate = 'Oct 2025 – Nov 2025';
  const expDateWidth = fontRegular.widthOfTextAtSize(expDate, 9.5);
  page.drawText(expDate, {
    x: pageWidth - rightMargin - expDateWidth,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: textColor,
  });
  currentY -= 11;

  page.drawText('Edunet Foundation (AICTE & Shell India)', {
    x: leftMargin,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  const expLoc = 'Remote';
  const expLocWidth = fontItalic.widthOfTextAtSize(expLoc, 9);
  page.drawText(expLoc, {
    x: pageWidth - rightMargin - expLocWidth,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  currentY -= 11;

  // Bullets
  const expBullets = [
    'Developed machine learning applications using Python, pandas, NumPy and scikit-learn, following structured software development practices.',
    'Performed data preprocessing, feature engineering, model development, testing and evaluation on real-world datasets.',
    'Collaborated with mentors and team members to deliver project milestones, documenting implementation details and presenting outcomes.',
  ];

  for (const b of expBullets) {
    const bulletLines = wrapText(b, contentWidth - 14, fontRegular, 9);
    for (let i = 0; i < bulletLines.length; i++) {
      if (i === 0) {
        page.drawText('–', {
          x: leftMargin + 3,
          y: currentY,
          size: 9,
          font: fontRegular,
          color: textColor,
        });
      }
      page.drawText(bulletLines[i], {
        x: leftMargin + 14,
        y: currentY,
        size: 9,
        font: fontRegular,
        color: textColor,
      });
      currentY -= 11.2;
    }
  }

  // --- PROJECTS ---
  currentY -= 3;
  drawSectionHeader('PROJECTS');

  // Project 1: Subscription Churn Prediction System
  const p1Title = 'Subscription Churn Prediction System';
  const p1Details = ' | FastAPI, React, SQLite, Scikit-Learn | GitHub';
  page.drawText(p1Title, {
    x: leftMargin,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: textColor,
  });
  const p1TitleWidth = fontBold.widthOfTextAtSize(p1Title, 9.5);
  page.drawText(p1Details, {
    x: leftMargin + p1TitleWidth,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  const p1Yr = '2026';
  const p1YrWidth = fontRegular.widthOfTextAtSize(p1Yr, 9.5);
  page.drawText(p1Yr, {
    x: pageWidth - rightMargin - p1YrWidth,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: textColor,
  });
  currentY -= 11;

  const p1Bullets = [
    'Served as Product Owner and Developer in a five-member Agile team, building a full-stack subscription churn prediction platform with FastAPI REST APIs for auth, analytics, prediction and reporting.',
    'Integrated React frontend with backend services; implemented JWT-based authentication, PDF/CSV report generation and database operations via SQLAlchemy.',
    'Optimized SQL query performance using indexed views and CTE-based queries, cutting critical query execution time from ~270 ms to under 40 ms.',
  ];

  for (const b of p1Bullets) {
    const bulletLines = wrapText(b, contentWidth - 14, fontRegular, 9);
    for (let i = 0; i < bulletLines.length; i++) {
      if (i === 0) {
        page.drawText('–', {
          x: leftMargin + 3,
          y: currentY,
          size: 9,
          font: fontRegular,
          color: textColor,
        });
      }
      page.drawText(bulletLines[i], {
        x: leftMargin + 14,
        y: currentY,
        size: 9,
        font: fontRegular,
        color: textColor,
      });
      currentY -= 11.2;
    }
  }

  currentY -= 3;

  // Project 2: Knowledge Vault AI
  const p2Title = 'Knowledge Vault AI';
  const p2Details = ' | Python, Flask, REST API, LangChain, ChromaDB, SQLite | GitHub';
  page.drawText(p2Title, {
    x: leftMargin,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: textColor,
  });
  const p2TitleWidth = fontBold.widthOfTextAtSize(p2Title, 9.5);
  page.drawText(p2Details, {
    x: leftMargin + p2TitleWidth,
    y: currentY,
    size: 9,
    font: fontItalic,
    color: textColor,
  });
  const p2Yr = '2026';
  const p2YrWidth = fontRegular.widthOfTextAtSize(p2Yr, 9.5);
  page.drawText(p2Yr, {
    x: pageWidth - rightMargin - p2YrWidth,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: textColor,
  });
  currentY -= 11;

  const p2Bullets = [
    'Designed an offline document intelligence app enabling semantic search and question answering with source-aware responses, requiring no external APIs.',
    'Built modular, reusable Flask REST APIs integrating SQLite, ChromaDB and LangChain for document indexing, retrieval, chat history and vector search.',
  ];

  for (const b of p2Bullets) {
    const bulletLines = wrapText(b, contentWidth - 14, fontRegular, 9);
    for (let i = 0; i < bulletLines.length; i++) {
      if (i === 0) {
        page.drawText('–', {
          x: leftMargin + 3,
          y: currentY,
          size: 9,
          font: fontRegular,
          color: textColor,
        });
      }
      page.drawText(bulletLines[i], {
        x: leftMargin + 14,
        y: currentY,
        size: 9,
        font: fontRegular,
        color: textColor,
      });
      currentY -= 11.2;
    }
  }

  // --- TECHNICAL SKILLS ---
  currentY -= 3;
  drawSectionHeader('TECHNICAL SKILLS');

  const skillsData = [
    { label: 'Languages: ', val: 'Python, Java, SQL' },
    { label: 'Software Development: ', val: 'FastAPI, Flask, REST APIs, Object-Oriented Programming, Data Structures & Algorithms' },
    { label: 'Frontend: ', val: 'React.js, HTML, CSS, JavaScript, Material UI' },
    { label: 'Databases: ', val: 'SQLite, PostgreSQL, SQLAlchemy, ChromaDB' },
    { label: 'AI / ML: ', val: 'Scikit-Learn, TensorFlow, LangChain, Hugging Face, OpenCV, SHAP' },
    { label: 'Tools: ', val: 'Git, GitHub, Docker, VS Code, Render' },
    { label: 'Concepts: ', val: 'Software Engineering, DBMS, Backend Development, API Integration, Agile Scrum, Computer Vision, NLP' },
  ];

  for (const sk of skillsData) {
    const labelWidth = fontBold.widthOfTextAtSize(sk.label, 9);
    page.drawText(sk.label, {
      x: leftMargin,
      y: currentY,
      size: 9,
      font: fontBold,
      color: textColor,
    });
    
    // Check wrapping for value
    const valLines = wrapText(sk.val, contentWidth - labelWidth, fontRegular, 9);
    if (valLines.length > 0) {
      page.drawText(valLines[0], {
        x: leftMargin + labelWidth,
        y: currentY,
        size: 9,
        font: fontRegular,
        color: textColor,
      });
      currentY -= 11.2;
      for (let j = 1; j < valLines.length; j++) {
        page.drawText(valLines[j], {
          x: leftMargin + labelWidth,
          y: currentY,
          size: 9,
          font: fontRegular,
          color: textColor,
        });
        currentY -= 11.2;
      }
    } else {
      currentY -= 11.2;
    }
  }

  // --- CERTIFICATIONS ---
  currentY -= 3;
  drawSectionHeader('CERTIFICATIONS');

  const certs = [
    'Principles of Generative AI – Infosys Springboard (2026)',
    'AI & Data Analytics – AICTE / Edunet Foundation / Shell India (2025)',
    'Python Essentials 1 & 2 – Cisco (2024)',
    'Introduction to SQL – Simplilearn (2024)',
    'TCS iON Career Edge – Young Professional (2024)',
  ];

  for (const cert of certs) {
    page.drawText(cert, {
      x: leftMargin + 8,
      y: currentY,
      size: 9,
      font: fontRegular,
      color: textColor,
    });
    currentY -= 11.4;
  }

  const pdfBytes = await pdfDoc.save();

  // Save to public/Maniraj_Kyatham_Resume.pdf
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const targetPath = path.join(publicDir, 'Maniraj_Kyatham_Resume.pdf');
  fs.writeFileSync(targetPath, pdfBytes);
  console.log(`Saved pristine PDF to: ${targetPath} (${pdfBytes.length} bytes)`);

  const pngPath = path.join(publicDir, 'Maniraj_Kyatham_Resume.png');
  try {
    const { execSync } = await import('child_process');
    execSync(`gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r300 -dGraphicsAlphaBits=4 -dTextAlphaBits=4 -sOutputFile="${pngPath}" "${targetPath}"`);
    console.log(`Rendered high-res PNG to: ${pngPath}`);
  } catch (renderErr) {
    console.warn('Ghostscript render warning:', renderErr.message);
  }

  // Also sync to dist if present
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'Maniraj_Kyatham_Resume.pdf'), pdfBytes);
    if (fs.existsSync(pngPath)) {
      fs.copyFileSync(pngPath, path.join(distDir, 'Maniraj_Kyatham_Resume.png'));
    }
    console.log(`Synced PDF and PNG to dist`);
  }
}

generateResume().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
