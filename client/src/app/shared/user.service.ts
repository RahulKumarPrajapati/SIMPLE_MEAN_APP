import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/";
  isauthenticated = false;
  login(data: any) {
    return this.http.post(this.url+'api/login',data);
  }

  setToken(token: any) {
    localStorage.setItem('token', token.token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      try{
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      catch(err){
        return null;
      }
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  

}
