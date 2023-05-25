import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly serverUrl: string = 'https://localhost:7222/api';

  constructor(private httpClient: HttpClient) {}

  register(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Register', body, {
      responseType: 'text',
    });
  }

  login(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Login', body, {
      responseType: 'text',
    });
  }

  getUser(userId): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/User?userId=' + userId);
  }

  saveUser(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/SaveUser', body, {
      responseType: 'text',
    });
  }

  findMatch(fromId, body): Observable<any> {
    return this.httpClient.post(
      this.serverUrl + '/MatchUser?fromId=' + fromId,
      body,
      { responseType: 'text' }
    );
  }

  getMatches(userId): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/GetMatches?userId=' + userId);
  }

  sendMessage(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/SendMessage', body, {
      responseType: 'text',
    });
  }

  getNewMessagesCount(userId): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/GetNewMessages?userId=' + userId
    );
  }

  getChats(userId): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/GetChats?userId=' + userId);
  }

  loadChat(fromId, toId): Observable<any> {
    return this.httpClient.get(
      this.serverUrl + '/LoadChat?fromId=' + fromId + '&toId=' + toId
    );
  }
}
