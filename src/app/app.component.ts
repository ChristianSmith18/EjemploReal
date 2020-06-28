import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoading = true;

  constructor(private auth: AuthenticationService, private title: Title) {
    this.title.setTitle('Cargando...');
    if (window.location.pathname !== '/data') {
      this.showLoading = false;
      this.title.setTitle('Gendarmería');
    }
    this.auth.isAuth().subscribe((value) => (this.showLoading = false));
  }
}
