import { DogServicesService } from './../services/dog-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, catchError, empty } from 'rxjs';
import { DogServicesModel } from '../models/dog-services.model';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dog-services-details',
  templateUrl: './dog-services-details.component.html',
  styleUrl: './dog-services-details.component.scss',
})
export class DogServicesDetailsComponent implements OnInit {
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  services$: Observable<DogServicesModel[]> | undefined;
  error$ = new Subject<boolean>();

  serviceSelect: DogServicesModel;

  constructor(
    private dogServicesService: DogServicesService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.services$ = this.dogServicesService.listServices().pipe(
      catchError((error) => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar a lista de Serviços. Tente novamente mais tarde.'
    );
  }

  onEdit(idService: any) {
    this.router.navigate(['edit', idService], { relativeTo: this.route });
  }

  onDelete(service) {
    this.serviceSelect = service;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.dogServicesService
      .deleteService(this.serviceSelect.idService)
      .subscribe(
        (success) => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        (error) => {
          this.alertService.showAlertDanger(
            'Erro ao remover Serviço. Tente novamente mais tarde.'
          );
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
