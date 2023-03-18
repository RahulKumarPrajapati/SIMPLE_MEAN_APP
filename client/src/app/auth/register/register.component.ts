import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgForm,FormControl}  from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  user: User = {
    username: '',
    email: '',
    password: '',
    role: ''
  }
  serverErrorMsg = '';
  url = "http://localhost:3000/";
  hastoken = false;
  token : any;
  isauthenticated = false;
  ngOnInit(): void {
    this.token = this.userService.getToken();
    if(this.token){
      if(this.userService.isLoggedIn()){
        this.isauthenticated = true
        this.router.navigateByUrl('/');

      }
      else{
        this.router.navigateByUrl('/register');
      }
      
    }
    else{
      this.router.navigateByUrl('/register');
    }
  }

  getDetails(data:NgForm){
    this.http.post(this.url+'api/register',data).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      err => {
        this.serverErrorMsg = 'All fields are maindatory';
      }
    )
  }
}
