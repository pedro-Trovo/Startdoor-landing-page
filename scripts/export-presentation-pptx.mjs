import puppeteer from 'puppeteer-core';
import PptxGenJS from 'pptxgenjs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputPath = path.resolve(root, 'startdoor-apresentacao.pptx');

const SLIDE_IDS = [
  'cover',
  'problem',
  'motivations',
  'objectives',
  'features',
  'tech',
  'demo',
  'future',
  'qa',
  'thanks',
];

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 5173;
const URL_BASE = `http://localhost:${PORT}/presentation`;

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for dev server'));
      fetch(url).then(() => resolve()).catch(() => setTimeout(check, 500));
    };
    check();
  });
}

async function startVite() {
  const proc = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });
  proc.stderr.on('data', d => process.stderr.write(d));
  return proc;
}

async function main() {
  console.log('Starting Vite dev server...');
  const vite = await startVite();
  await waitForServer(URL_BASE);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const screenshots = [];
    for (const id of SLIDE_IDS) {
      console.log(`  Capturing slide: ${id}`);
      await page.goto(`${URL_BASE}#${id}`, { waitUntil: 'networkidle0', timeout: 15000 });
      await page.waitForSelector(`#${id}`, { timeout: 10000 });
      await page.evaluate((slideId) => {
        document.getElementById(slideId)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, id);
      await new Promise(r => setTimeout(r, 500));
      const buf = await page.screenshot({ type: 'png', fullPage: false });
      screenshots.push(buf);
    }

    await browser.close();
    browser = null;

    console.log('Creating PPTX...');
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });
    pptx.layout = 'WIDE';

    for (let i = 0; i < screenshots.length; i++) {
      const slide = pptx.addSlide();
      slide.addImage({
        data: `data:image/png;base64,${screenshots[i].toString('base64')}`,
        x: 0, y: 0, w: 13.333, h: 7.5,
      });
    }

    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nDone! PPTX saved to: ${outputPath}`);
  } finally {
    if (browser) await browser.close();
    vite.kill('SIGTERM');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
