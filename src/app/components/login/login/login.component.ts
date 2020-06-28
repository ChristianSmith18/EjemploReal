import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Gendarmería');

    this.auth.isAuth().subscribe((a) => {
      if (a !== null) {
        this.router.navigate(['data']);
      }
    });
  }

  signIn() {
    this.auth
      .signIn(this.email, this.password)
      .then((u) => {
        this.router.navigate(['data']);
      })
      .catch(console.error);
  }
}
