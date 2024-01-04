import { Router } from '@angular/router';
import { TokenjwtService } from './../login/tokenjwt.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private tokenSecurity: TokenjwtService, private router: Router) {}

  logout() {
    this.tokenSecurity.deleteToken();
    this.router.navigateByUrl('/home');
  }
}
