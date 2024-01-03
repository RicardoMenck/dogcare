import { Component } from '@angular/core';
import { tokenGetter } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dogcare';

  Logged() {
    const tokenJWT = tokenGetter();
    return tokenJWT != null;
  }
}
