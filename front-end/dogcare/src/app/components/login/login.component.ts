import { TokenjwtService } from './tokenjwt.service';
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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenjwt: TokenjwtService
  ) {}

  mensagemValidForm = '';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Entre com um valor de email!';
    }

    return this.email.hasError('email') ? 'Este email não é válido' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Entre com um valor de senha!';
    }

    return this.password.hasError('minLength')
      ? 'Sua senha precisa ter ao minimo 6 caracteres'
      : '';
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
            console.log(result.name);
            this.tokenjwt.keepToken(result.token);
            this.router.navigateByUrl('/dog');
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
