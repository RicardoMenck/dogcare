import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog.service';
import { DogModel } from '../models/dog.model';
import { Observable, Subject, catchError, empty } from 'rxjs';
import { AlertModalService } from '../../../shared/alert-modal.service';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss',
})
export class DogDetailsComponent implements OnInit {
  //dogs: DogModel[] = [];

  dogs$: Observable<DogModel[]> | undefined;
  error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef | undefined;

  constructor(
    private dogService: DogService,
    //private modalService: BsModalService
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.dogService.listDog().subscribe((dados) => (this.dogs = dados));
    // this.dogs$ = this.dogService.listDog();
    this.onRefresh();
  }

  onRefresh() {
    this.dogs$ = this.dogService.listDog().pipe(
      catchError((error) => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
    // this.dogService
    //   .listDog()
    //   .pipe(catchError((error) => empty()))
    //   .subscribe(
    //     (dados) => {
    //       console.log(dados);
    //     }
    //     // (error) => console.error(error),
    //     // () => console.log('Observable completo!')
    //   );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar a lista de cachorros. Tente novamente mais tarde.'
    );
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message =
    //   'Erro ao carregar a lista de cachorros. Tente novamente mais tarde.';
  }

  onEdit(dog: DogModel) {
    this.router.navigate(['edit', idDog], { relativeTo: this.route });
  }
}
