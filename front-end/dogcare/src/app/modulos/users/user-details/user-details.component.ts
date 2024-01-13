import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, catchError, empty } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  users$: Observable<UserModel[]> | undefined;
  error$ = new Subject<boolean>();

  userSelect: UserModel;

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.users$ = this.userService.listUser().pipe(
      catchError((error) => {
        console.error(error);
        this.handleError();
        return empty();
      })
    );
  }
  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar a lista de usuários. Tente novamente mais tarde.'
    );
  }

  onEdit(idUser: any) {
    this.router.navigate(['edit', idUser], { relativeTo: this.route });
  }

  onDelete(user) {
    this.userSelect = user;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.userService.deleteUser(this.userSelect.idUser).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showAlertDanger(
          'Erro ao remover usuário. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
