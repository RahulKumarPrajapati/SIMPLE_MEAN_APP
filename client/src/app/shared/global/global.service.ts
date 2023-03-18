import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  isauthenticated = false;
  serverErrorMsg = '';
  passOrFail = 'danger';
}
