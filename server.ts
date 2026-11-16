import crypto from 'crypto';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Server-side passphrase configuration. Never imported or exposed in frontend bundles.
const CONFIGURED_PASSWORD = process.env.SITE_PASSWORD?.trim() || '';
const SERVER_PASSWORD = CONFIGURED_PASSWORD || 'goldenhour';
const PASSPHRASE_HINT =
  process.env.PASSPHRASE_HINT?.trim() ||
  (CONFIGURED_PASSWORD ? '' : 'The light when waves meet warm sand');

// Ephemeral fallback secret if SESSION_SECRET is unset (safe for single-instance preview; set SESSION_SECRET in prod)
const SESSION_SECRET =
  process.env.SESSION_SECRET?.trim() || crypto.randomBytes(32).toString('hex');

const COOKIE_NAME = 'private_universe_session';
const PRIVATE_MEDIA_ROOT = path.resolve(__dirname, 'private-media');

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.m4a': 'audio/mp4',
  '.ogg': 'audio/ogg',
};

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = decodeURIComponent(part.slice(idx + 1).trim());
    result[key] = val;
  }
  return result;
}

function signToken(issuedAt: number): string {
  const payload = `${issuedAt}.${crypto.randomBytes(12).toString('hex')}`;
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [issuedStr, nonce, providedSig] = parts;
  const issuedAt = Number(issuedStr);
  if (!Number.isFinite(issuedAt)) return false;

  // Session valid for 7 days
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - issuedAt > maxAgeMs) return false;

  const payload = `${issuedStr}.${nonce}`;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  const bufA = Buffer.from(providedSig, 'utf8');
  const bufB = Buffer.from(expectedSig, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function timingSafeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function isAuthenticated(req: Request): boolean {
  const cookies = parseCookies(req.headers.cookie);
  return verifyToken(cookies[COOKIE_NAME]);
}

function ensurePrivateMediaDirectories() {
  const dirs = [
    'images/beach',
    'images/college',
    'images/delhi',
    'images/travel',
    'images/mountains',
    'images/portraits',
    'images/album-art',
    'videos/intro',
    'videos/college',
    'videos/travel',
    'videos/delhi',
    'videos/mountains',
    'audio/her',
    'audio/mine',
    'audio/music',
  ];
  for (const dir of dirs) {
    fs.mkdirSync(path.join(PRIVATE_MEDIA_ROOT, dir), { recursive: true });
  }
}

async function startServer() {
  ensurePrivateMediaDirectories();

  const app = express();
  app.disable('x-powered-by');

  // Privacy & indexing prevention headers on every response
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
  });

  app.use(express.json({ limit: '100kb' }));

  // robots.txt disallowing all crawlers
  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.type('text/plain').send('User-agent: *\nDisallow: /\n');
  });

  // Check current authentication status (never exposes password)
  app.get('/api/auth/status', (req: Request, res: Response) => {
    res.json({
      authenticated: isAuthenticated(req),
      hint: PASSPHRASE_HINT,
      usingDefaultPassphrase: !CONFIGURED_PASSWORD,
    });
  });

  // Server-side passphrase verification
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const candidate =
      typeof req.body?.password === 'string' ? req.body.password.trim() : '';

    if (!candidate) {
      res.status(400).json({ ok: false, error: 'Please enter the passphrase.' });
      return;
    }

    if (!timingSafeCompare(candidate, SERVER_PASSWORD)) {
      res.status(401).json({
        ok: false,
        error: 'That passphrase does not unlock this place.',
      });
      return;
    }

    const token = signToken(Date.now());
    const cookieParts = [
      `${COOKIE_NAME}=${encodeURIComponent(token)}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${7 * 24 * 60 * 60}`,
    ];
    if (IS_PRODUCTION && process.env.HTTPS === 'true') {
      cookieParts.push('Secure');
    }
    res.setHeader('Set-Cookie', cookieParts.join('; '));
    res.json({ ok: true });
  });

  app.post('/api/auth/logout', (_req: Request, res: Response) => {
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
    );
    res.json({ ok: true });
  });

  // Authenticated private media streaming endpoint with HTTP Range support for video/audio
  app.get('/api/media/*', (req: Request, res: Response) => {
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const relativeRequested = (req.params as Record<string, string>)[0] || '';
    const safePath = path.resolve(PRIVATE_MEDIA_ROOT, relativeRequested);

    if (
      !safePath.startsWith(PRIVATE_MEDIA_ROOT + path.sep) &&
      safePath !== PRIVATE_MEDIA_ROOT
    ) {
      res.status(403).json({ error: 'Forbidden path' });
      return;
    }

    if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
      res.status(404).json({ error: 'Media asset not yet uploaded' });
      return;
    }

    const stat = fs.statSync(safePath);
    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const range = req.headers.range;

    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.setHeader('Accept-Ranges', 'bytes');

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;

      if (
        Number.isNaN(start) ||
        Number.isNaN(end) ||
        start >= stat.size ||
        end >= stat.size ||
        start > end
      ) {
        res.status(416).setHeader('Content-Range', `bytes */${stat.size}`).end();
        return;
      }

      const chunkSize = end - start + 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });
      fs.createReadStream(safePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
    });
    fs.createReadStream(safePath).pipe(res);
  });

  const httpServer = http.createServer(app);

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: { server: httpServer },
        watch: process.env.DISABLE_HMR === 'true' ? null : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Private universe server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
