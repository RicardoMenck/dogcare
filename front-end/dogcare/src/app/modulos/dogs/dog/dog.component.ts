import { DogModel } from '../models/dog.model';
import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(
    private dogService: DogService,
    private formBuilder: FormBuilder
  ) {
    //primeira parte campos do formulario.
    this.dogFormCreate = this.formBuilder.group({
      //dogName: new FormControl(null,[Validators.required]))
      id: [null],
      dogName: [null, [Validators.required]], //com validators
      breed: [null], //sem validators
      color: ['preto'], //por padrão esse valor
      sexo: [null],
      neutered: [null],
      peso: [null],
    });
  }

  ngOnInit(): void {
    this.dogService.listDog();
  }

  // addDog() {
  //   this.dog.dogName = 'Rex';
  //   this.dog.breed = 'Caramelo';
  //   this.dog.color = 'Caramelo';
  //   this.dog.sexo = 'FÊMEA';
  //   this.dog.neutered = true;
  //   this.dog.peso = 25.5;
  //   this.dogService.saveDog(this.dog);
  // }

  saveDog() {
    for (const key in this.dogFormCreate.controls) {
      if (this.dogFormCreate.controls.hasOwnProperty(key)) {
        this.dogFormCreate.controls[key].markAsDirty();
        this.dogFormCreate.controls[key].updateValueAndValidity();
      }
    }
    if (this.dogFormCreate.valid) {
      const formValues: DogModel = this.dogFormCreate.getRawValue();
      if (formValues.idDog) {
        this.dogService.updateDog(formValues).subscribe(() => {
          this.cleanForm();
        });
      } else {
        this.dogService.saveDog(formValues).subscribe(() => {
          this.cleanForm();
        });
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
}
