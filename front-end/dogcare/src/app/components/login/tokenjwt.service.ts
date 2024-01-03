import { UserModel } from '../user/user.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenjwtService {
  private key = 'jwt';
  logged?: UserModel;

  keepToken(token: string) {
    localStorage.setItem(this.key, token);
    const userToken = new JwtHelperService().decodeToken(token);
    this.userLogged(userToken);
  }

  deleteToken() {
    localStorage.removeItem(this.key);
    this.userLogged(null);
  }

  private userLogged(date?: any) {
    this.logged = {
      userName: date?.name,
      email: date?.email,
      phone: date?.phone,
      password: date?.password,
      zipCode: date?.zipCode,
      address: date?.address,
      streetNumber: date?.streetNumber,
      complement: date?.complement,
      neighborhood: date?.neighborhood,
      city: date?.city,
      state: date?.state,
      cpf: date?.cpf,
      userRole: date?.admin,
    };
  }
}
