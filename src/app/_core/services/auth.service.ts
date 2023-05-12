import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly serverUrl: string = 'https://localhost:7222/api/Register';

  constructor(private httpClient: HttpClient) {}

  register(body): Observable<any> {
    return this.httpClient.post(this.serverUrl, body);
  }

  login(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Login', body);
  }

  /*register(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/register', body);
  }*/
}
