import { DogModel } from '../models/dog.model';
import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.scss',
})
export class DogComponent implements OnInit {
  dog: DogModel | undefined;
  //dog = {} as DogModel;
  dogs: DogModel[] = [];

  dogFormCreate!: FormGroup;
  submitted = false;

  constructor(
    private dogService: DogService,
    private formBuilder: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    //primeira parte campos do formulario.
    this.dogFormCreate = this.formBuilder.group({
      //dogName: new FormControl(null,[Validators.required]))
      idDog: [null],
      dogName: [null, [Validators.required, Validators.maxLength(250)]], //com validators
      breed: [null, [Validators.required, Validators.maxLength(250)]], //sem validators
      color: [null, [Validators.required, Validators.maxLength(250)]], //por padrão esse valor
      sexo: [null, [Validators.required]],
      neutered: [null, [Validators.required]],
      peso: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['idDog'];
      console.log(id);
      const dog$ = this.dogService.loadById(id);
      dog$.subscribe((dog) => {
        this.updateDogForm(dog);
      });
    });
    this.route.params
      .pipe(
        map(
          (params: any) => params['idDog'],
          switchMap((idDog) => this.dogService.loadById(idDog))
        )
      )
      .subscribe((dog) => this.updateDogForm(dog));

    this.dogService.listDog();
  }

  updateDogForm(dog) {
    this.dogFormCreate.patchValue({
      idDog: dog.idDog,
      dogName: dog.dogName,
      breed: dog.breed,
      color: dog.color,
      sexo: dog.sexo,
      neutered: dog.neutered,
      peso: dog.peso,
    });
  }

  saveDog() {
    this.submitted = true;
    for (const key in this.dogFormCreate.controls) {
      if (this.dogFormCreate.controls.hasOwnProperty(key)) {
        this.dogFormCreate.controls[key].markAsDirty();
        this.dogFormCreate.controls[key].updateValueAndValidity();
      }
    }
    if (this.dogFormCreate.valid) {
      const formValues: DogModel = this.dogFormCreate.getRawValue();
      if (formValues.idDog) {
        this.dogService.updateDog(formValues).subscribe(
          (success) => {
            this.modal.showAlertSuccess(
              'Cachorro atualizado com sucesso! 🐾🐶'
            ),
              this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao cadastrar o cachorro, tente novamente ou contacte a equipe de suporte!'
            ),
          () => {
            this.cleanForm();
          }
        );
      } else {
        this.dogService.saveDog(formValues).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Cachorro registrado com sucesso!');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao cadastrar o cachorro, tente novamente ou contacte a equipe de suporte!'
            ),
          () => {
            this.cleanForm();
          }
        );
      }
    }
  }

  listDog() {
    this.dogService.listDog().subscribe((dogs: DogModel[]) => {
      this.dogs = dogs;
    });
  }

  deleteDog(id: number) {
    this.dogService.deleteDog(id).subscribe(() => {
      this.listDog();
    });
  }

  cleanForm() {
    this.listDog();
    this.dogFormCreate.reset();
    this.dog = {} as DogModel;
  }

  onCancel() {
    this.submitted = false;
    this.dogFormCreate.reset();
    //console.log('cancelado');
  }

  hasError(field: string) {
    return this.dogFormCreate.get(field)?.errors;
  }
}
