import { Component } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  user,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
