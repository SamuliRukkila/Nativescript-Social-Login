import { Injectable } from '@angular/core';
import { ITnsOAuthTokenResult } from 'nativescript-oauth2';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  public url = 'NGROK_URL/';

  constructor(private http: HttpClient) { }

  // Tekee HTTP-POST kyselyn backendiin, vieden mukana samalla sosiaalisen kirjautumisen
  // tiedot (token)
  public socialLogin(result: ITnsOAuthTokenResult, platform: string): Observable<any> {
    // POST-url riippuu siitä kumpaan sosiaaliseen alustaan teemme kyselyn
    const route = platform === 'google' ? 'googlelogin' : 'fblogin';
    return this.http.post<any>(this.url + route, result, headers)
  }
}
