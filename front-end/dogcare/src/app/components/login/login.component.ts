import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService], // Injeção local de dep.
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  hide = true;
  constructor(private loginService: LoginService, private router: Router) {}

  mensagemValidForm = '';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minLength') ? 'Ao menos 6 caracteris' : '';
  }

  realizarLogin() {
    this.mensagemValidForm = '';

    this.email.markAsDirty();
    this.email.updateValueAndValidity();

    this.password.markAsDirty();
    this.password.updateValueAndValidity();

    // for (const key in this.form.controls) {
    // 	if (this.form.controls.hasOwnProperty(key)) {
    // 		this.form.controls[key].markAsDirty();
    // 		this.form.controls[key].updateValueAndValidity();
    // 	}
    // }

    if (this.email.valid && this.password.valid) {
      this.loginService
        .login(this.email.value ?? '', this.password.value ?? '')
        .pipe(take(1))
        .subscribe({
          next: (result: LoginModel) => {
            console.log(result.token);
            this.router.navigateByUrl('/restrito');
          },
          error: (error) => {
            console.log('Mensagem de erro!', error);
          },
        }); //.value para pegar o valor
    } else {
      this.mensagemValidForm = 'Preencher os campos!';
    }
  }
}
