import { DogModel } from './../../models/dog.model';
import { Component, OnInit } from '@angular/core';
import { DogService } from './dog.service';
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

  form!: FormGroup;

  constructor(
    private dogService: DogService,
    private formBuilder: FormBuilder
  ) {
    //primeira parte campos do formulario.
    this.form = this.formBuilder.group({
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
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
      const formValues: DogModel = this.form.getRawValue();
      if (formValues.id) {
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
    this.form.reset();
    this.dog = {} as DogModel;
  }
}
