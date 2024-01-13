import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../modulos/users/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent implements OnInit {
  user: UserModel | undefined;
  users: UserModel[] = [];

  userFormRegister!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.userFormRegister = this.formBuilder.group({
      id: [null],
      userName: [null],
      email: [null, [Validators.required]],
      phone: [null],
      password: [null, [Validators.required]],
      zipCode: [null],
      address: [null],
      streetNumber: [null],
      complement: [null],
      neighborhood: [null],
      city: [null],
      state: [null],
      cpf: [null, [Validators.required]],
      role: ['USER'],
    });
  }

  ngOnInit(): void {
    this.registerService;
  }

  registerUser() {
    for (const key in this.userFormRegister.controls) {
      if (this.userFormRegister.controls.hasOwnProperty(key)) {
        this.userFormRegister.controls[key].markAsDirty();
        this.userFormRegister.controls[key].updateValueAndValidity();
      }
    }
    if (this.userFormRegister.valid) {
      const formValues: UserModel = this.userFormRegister.getRawValue();
      this.registerService.registerUser(formValues).subscribe();
    }
  }

  consultaCEP(cep, form) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != '') {
    }

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      this.http
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .pipe(map((dados: string) => dados))
        .subscribe((dados) => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, forms) {
    // forms.setValue({
    //   zipCode: dados.cep,
    //   address: dados.logradouro,
    //   streetNumber: [null],
    //   complement: dados.complemento,
    //   neighborhood: dados.bairro,
    //   city: dados.localidade,
    //   state: dados.uf,
    // });
    // console.log(forms);

    forms.form.patchValue({
      address: dados.logradouro,
      complement: dados.complemento,
      neighborhood: dados.bairro,
      city: dados.localidade,
      state: dados.uf,
    });
  }
}
