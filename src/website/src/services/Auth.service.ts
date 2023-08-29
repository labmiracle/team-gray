import { ApiService, apiServiceInstance } from './ApiService';
import { Endpoint } from './endpoints';
import { ILoginProfessionalUser } from '../interfaces/LoginProfessionalUser.interface';
import { IProfessionalUser } from '../interfaces/ProfessionalUser.interface';
import decodeToken from 'jwt-decode';

export class AuthService {
  constructor(private apiService: ApiService) {}
  async ProfessionalUserLogin(
    login: ILoginProfessionalUser
  ): Promise<IProfessionalUser | undefined> {
    const response = await this.apiService.post<string>(
      Endpoint.loginProfessionalUser,
      undefined,
      JSON.stringify(login)
    );
    if (response) {
      localStorage.setItem('token', response);
      const authUser = decodeToken(response);
      return authUser as IProfessionalUser;
    }
    return undefined;
  }

  async ProfessionalUserRegister(user: IProfessionalUser): Promise<string> {
    const response = await this.apiService.post<string>(
      Endpoint.signupProfessionalUser,
      undefined,
      JSON.stringify(user)
    );

    return response;
  }
}

export const authServiceInstance = new AuthService(apiServiceInstance);
