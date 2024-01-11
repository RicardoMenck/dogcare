import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DogService } from '../services/dog.service';
import { DogModel } from '../models/dog.model';
import { Observable, Subject, catchError, empty } from 'rxjs';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { DogsModule } from '../dogs.module';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss',
})
export class DogDetailsComponent implements OnInit {
  //dogs: DogModel[] = [];

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  dogs$: Observable<DogModel[]> | undefined;
  error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef | undefined;

  dogSelect: DogModel;

  constructor(
    private dogService: DogService,
    private modalService: BsModalService,
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

  onEdit(idDog: any) {
    this.router.navigate(['edit', idDog], { relativeTo: this.route });
  }

  onDelete(dog) {
    this.dogSelect = dog;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.dogService.deleteDog(this.dogSelect.idDog).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showAlertDanger(
          'Erro ao remover cachorros. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
