import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

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
      .catch(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrectos!',
        });
      });
  }
}
