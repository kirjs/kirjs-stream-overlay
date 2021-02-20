import TwitchJs, {Chat} from 'twitch-js';
import {Injectable} from '@angular/core';
import {combineLatest, interval, Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class TwitchClient {
  readonly username = 'kirjs';
  readonly timeout = 30000;
  readonly token = 'xcdg6m9as2rk5v94b2mtl49adz4so1';
  readonly now$ = interval(1000).pipe(map(() => Date.now()));
  readonly messages$ = new Observable<any[]>(subscriber => {
    const username = this.username;
    const token = this.token;
    const timeout = this.timeout;


    async function start(): Promise<void> {
      const chat = new Chat({
        username,
        token,
        log: {level: 'warn'}
      });

      let messages: any[] = [];
      subscriber.next(messages);
      const commands = ['JOIN', 'PRIVMSG'];
      chat.on('*', (message: any) => {
        if (commands.includes(message.command)) {
          messages.push(message);
          const now = Date.now();
          messages = messages.filter(m => now - m.timestamp < timeout);
          subscriber.next(messages);
        }
      });


      await chat.connect();
      await chat.join('kirjs');
    }

    start();
  });

  readonly chat$ = combineLatest([this.messages$, this.now$]).pipe(map(([messages, now]) => {
    return messages.filter(m => now - m.timestamp < this.timeout);
  }));

}


