import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog.service';
import { DogModel } from '../models/dog.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss',
})
export class DogDetailsComponent implements OnInit {
  //dogs: DogModel[] = [];

  dogs$: Observable<DogModel[]> | undefined;

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    //this.dogService.listDog().subscribe((dados) => (this.dogs = dados));
    this.dogs$ = this.dogService.listDog();
  }
}
