export interface UserModel {
  idUser?: number;
  userName: string;
  email: string;
  phone: string;
  password: string;
  zipCode: string;
  address: string;
  streetNumber: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cpf: string;
  role: string;
}
