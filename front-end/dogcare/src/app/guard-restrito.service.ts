import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardRestritoService implements CanActivate {

  constructor() { }
  canActivate() {
      //verificar o JWT
      return true;
      //caso contrario return false;
  }
}
