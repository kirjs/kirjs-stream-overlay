import { APP_BASE_HREF } from '@angular/common';
import { NgxRequest, NgxResponse } from '@gorniv/ngx-universal';
import { provideLocation, provideUserAgent } from '@ng-web-apis/universal';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { exit } from 'process';
import { AppServerModule } from './src/main.server';

export const distFolder = join(
  process.cwd(),
  'dist',
  'kirjs-stream-ui',
  'browser',
);
// for debug
require('source-map-support').install();

// for tests
const test = process.env['TEST'] === 'true';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();

  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // redirects!
  const redirectowww = false;
  const redirectohttps = false;
  const wwwredirecto = true;
  server.use((req, res, next) => {
    // for domain/index.html
    if (req.url === '/index.html') {
      res.redirect(301, 'https://' + req.hostname);
    }

    // check if it is a secure (https) request
    // if not redirect to the equivalent https url
    if (
      redirectohttps &&
      req.headers['x-forwarded-proto'] !== 'https' &&
      req.hostname !== 'localhost'
    ) {
      // special for robots.txt
      if (req.url === '/robots.txt') {
        next();
        return;
      }
      res.redirect(301, 'https://' + req.hostname + req.url);
    }

    // www or not
    if (redirectowww && !req.hostname.startsWith('www.')) {
      res.redirect(301, 'https://www.' + req.hostname + req.url);
    }

    // www or not
    if (wwwredirecto && req.hostname.startsWith('www.')) {
      const host = req.hostname.slice(4, req.hostname.length);
      res.redirect(301, 'https://' + host + req.url);
    }

    // for test
    if (test && req.url === '/test/exit') {
      res.send('exit');
      exit(0);
    }

    next();
  });

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    console.log('HELLO');
    const http =
      req.headers['x-forwarded-proto'] === undefined
        ? 'https'
        : req.headers['x-forwarded-proto'];

    const options = {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        provideLocation(req),
        provideUserAgent(req),
        // for http and cookies
        {
          provide: REQUEST,
          useValue: req,
        },
        {
          provide: RESPONSE,
          useValue: res,
        },
        /// for cookie
        {
          provide: NgxRequest,
          useValue: req,
        },
        {
          provide: NgxResponse,
          useValue: res,
        },
        // for absolute path
        {
          provide: 'ORIGIN_URL',
          useValue: `${http}://${req.headers.host}`,
        },
      ],
    };

    res.render(indexHtml, options);
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  // gzip
  server.use(compression());
  // cokies
  server.use(cookieparser());

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
