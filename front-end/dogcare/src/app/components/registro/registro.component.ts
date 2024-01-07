import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../modulos/users/user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

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
    private formBuilder: FormBuilder
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
}
