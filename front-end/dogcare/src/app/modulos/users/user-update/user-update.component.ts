import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
})
export class UserUpdateComponent implements OnInit {
  user: UserModel | undefined;
  users: UserModel[] = [];
  userFormUpdate!: FormGroup;
  submitted = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.userFormUpdate = this.formBuilder.group({
      idUser: [null],
      userName: [null],
      email: [null],
      phone: [null],
      zipCode: [null],
      address: [null],
      streetNumber: [null],
      complement: [null],
      neighborhood: [null],
      city: [null],
      state: [null],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['idUser'];
      console.log(id);
      const user$ = this.userService.loadUserById(id);
      user$.subscribe((user) => {
        this.updateUserForm(user);
      });
    });
    this.route.params
      .pipe(
        map(
          (params: any) => params['idUser'],
          switchMap((idUser) => this.userService.loadUserById(idUser))
        )
      )
      .subscribe((user) => this.updateUserForm(user));

    this.userService.listUser();
  }

  updateUserForm(user) {
    this.userFormUpdate.patchValue({
      idUser: user.idUser,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      zipCode: user.zipCode,
      address: user.address,
      streetNumber: user.streetNumber,
      complement: user.complement,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
    });
  }

  udpateUser() {
    this.submitted = true;
    for (const key in this.userFormUpdate.controls) {
      if (this.userFormUpdate.controls.hasOwnProperty(key)) {
        this.userFormUpdate.controls[key].markAsDirty();
        this.userFormUpdate.controls[key].updateValueAndValidity();
      }
    }
    if (this.userFormUpdate.valid) {
      const formValues: UserModel = this.userFormUpdate.getRawValue();
      if (formValues.idUser) {
        this.userService.updateUser(formValues).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Usuário atualizado com sucesso!'),
              this.location.back();
          },

          (error) =>
            this.modal.showAlertDanger(
              'Erro ao atualizar o Usuário, tente novamente ou contacte a equipe de suporte!'
            ),
          () => {
            this.cleanForm();
          }
        );
      }
    }
  }

  listUser() {
    this.userService.listUser().subscribe((users: UserModel[]) => {
      this.users = users;
    });
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.listUser();
    });
  }
  cleanForm() {
    this.listUser();
    this.userFormUpdate.reset();
    this.user = {} as UserModel;
  }
  onCancel() {
    this.submitted = false;
    this.userFormUpdate.reset();
    this.location.back();
    //console.log('cancelado');
  }
  hasError(field: string) {
    return this.userFormUpdate.get(field)?.errors;
  }
}
