import { Component } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  user,
} from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        MatButtonModule,
        AsyncPipe,
    ],
})
export class LoginComponent {
  user$ = user(this.auth);
  constructor(public auth: Auth) {}

  login(): void {
    signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  logout(): void {
    signOut(this.auth);
  }
}
