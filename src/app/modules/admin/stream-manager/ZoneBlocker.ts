import { Injectable } from '@angular/core';
import 'zone.js';

@Injectable({ providedIn: 'root' })
export class ZoneBlocker {
  constructor() {}

  blockZone() {
    // const timeout = setTimeout(() => {}, 5000);

    return function () {
      // console.log('UNBLOCKING ZONE');
      // clearTimeout(timeout);
    };
  }
}
