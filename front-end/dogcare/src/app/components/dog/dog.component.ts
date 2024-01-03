import { Component, OnInit } from '@angular/core';
import { DogModel } from './dog.model';
import { DogService } from './dog.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.scss',
})
export class DogComponent implements OnInit {
  dog = {} as DogModel;
  dogs: DogModel[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.dogService.listDog();
  }

  addDog() {
    this.dog.dogName = 'Rex';
    this.dog.breed = 'Caramelo';
    this.dog.color = 'Caramelo';
    this.dog.sexo = 'FÊMEA';
    this.dog.neutered = true;
    this.dog.peso = 25.5;
    this.dogService.saveDog(this.dog);
  }

  saveDog(form: NgForm) {
    if (this.dog.id !== undefined) {
      this.dogService.updateDog(this.dog).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.dogService.saveDog(this.dog).subscribe(() => {
        this.cleanForm(form);
      });
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

  cleanForm(form: NgForm) {
    this.listDog();
    form.resetForm();
    this.dog = {} as DogModel;
  }
}
