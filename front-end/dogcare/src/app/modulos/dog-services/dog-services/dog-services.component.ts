import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DogServicesModel } from '../models/dog-services.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { DogServicesService } from '../services/dog-services.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-dog-services',
  templateUrl: './dog-services.component.html',
  styleUrl: './dog-services.component.scss',
})
export class DogServicesComponent implements OnInit {
  service: DogServicesModel | undefined;
  services: DogServicesModel[] = [];

  dogServiceFormCreate!: FormGroup;
  submitted = false;

  constructor(
    private dogServiceService: DogServicesService,
    private formBuilder: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.dogServiceFormCreate = this.formBuilder.group({
      idService: [null],
      name: [null, [Validators.required, Validators.maxLength(250)]],
      description: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['idService'];
      console.log(id);
      const service$ = this.dogServiceService.loadServiceById(id);
      service$.subscribe((service) => {
        this.updateDogServiceForm(service);
      });
    });
    this.route.params
      .pipe(
        map(
          (params: any) => params['idService'],
          switchMap((idService) =>
            this.dogServiceService.loadServiceById(idService)
          )
        )
      )
      .subscribe((service) => this.updateDogServiceForm(service));
    this.dogServiceService.listServices();
  }

  updateDogServiceForm(service) {
    this.dogServiceFormCreate.patchValue({
      idService: service.idService,
      name: service.name,
      description: service.description,
    });
  }

  saveService() {
    this.submitted = true;
    for (const key in this.dogServiceFormCreate.controls) {
      if (this.dogServiceFormCreate.controls.hasOwnProperty(key)) {
        this.dogServiceFormCreate.controls[key].markAsDirty();
        this.dogServiceFormCreate.controls[key].updateValueAndValidity();
      }
    }
    if (this.dogServiceFormCreate.valid) {
      const formValues: DogServicesModel =
        this.dogServiceFormCreate.getRawValue();
      if (formValues.idService) {
        this.dogServiceService.updateService(formValues).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Serviço atualizado com sucesso! 🐾🐶'),
              this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao atualizar o serviço, tente novamente ou contacte a equipe de suporte!'
            ),
          () => {
            this.cleanForm();
          }
        );
      } else {
        this.dogServiceService.saveService(formValues).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Serviço registrado com sucesso!');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao cadastrar o serviço, tente novamente ou contacte a equipe de suporte!'
            ),
          () => {
            this.cleanForm();
          }
        );
      }
    }
  }

  listService() {
    this.dogServiceService
      .listServices()
      .subscribe((services: DogServicesModel[]) => {
        this.services = services;
      });
  }

  deleteService(id: number) {
    this.dogServiceService.deleteService(id).subscribe(() => {
      this.listService();
    });
  }

  cleanForm() {
    this.listService();
    this.dogServiceFormCreate.reset();
    this.service = {} as DogServicesModel;
  }

  onCancel() {
    this.submitted = false;
    this.dogServiceFormCreate.reset();
    this.location.back();
    //console.log('cancelado');
  }

  hasError(field: string) {
    return this.dogServiceFormCreate.get(field)?.errors;
  }
}
