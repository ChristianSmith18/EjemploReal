import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  subject$ = new Subject();
  constructor(private auth: AngularFireAuth) {}

  isAuth() {
    return this.auth.authState;
  }

  signIn(email: string, password: string) {
    localStorage.setItem('auth', 'true');
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    localStorage.setItem('auth', 'false');
    return this.auth.signOut();
  }
}
