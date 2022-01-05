// ssr DOM
import '@ng-web-apis/universal/mocks';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/zone-patch-rxjs';

const domino = require('domino');
const fs = require('fs');
const path = require('path');

// index from browser build!

export const distFolder = join(
  process.cwd(),
  'dist',
  'kirjs-stream-overlay',
  'browser',
);
const template = fs
  .readFileSync(path.join(distFolder, 'index.html'))
  .toString();
// for mock global window by domino
const win = domino.createWindow(template);
// mock
global['window'] = win;
global['navigator'] = win.navigator;

// (global as any)['requestAnimationFrame'] = function () {};
// win['requestAnimationFrame'] = function () {};

global['cancelAnimationFrame'] = function (id) {
  clearTimeout(id);
};

(global as any)['debug'] = () => {};

// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
// mock documnet
global['document'] = win.document;
// othres mock
global['CSS'] = null as any;

require('extra_server');
