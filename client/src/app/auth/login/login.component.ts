import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  user: User = {
    username: '',
    email: '',
    password: '',
    role: ''
  }
  
  serverErrorMsg = '';
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
        this.router.navigateByUrl('/login');
      }
      
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }


  authenticate(data:NgForm){
    this.userService.login(data).subscribe(
      res => {
        this.userService.setToken(res);
        this.router.navigate(['/'])
      },
      err => {
        this.serverErrorMsg = err.error.message;
      })
  }

}
