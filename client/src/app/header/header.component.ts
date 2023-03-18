import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../shared/global/global.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public globalService: GlobalService,private userService: UserService, private router: Router) { }

  hastoken = false;
  token : any;
  ngOnInit(): void {
    this.token = this.userService.getToken();
    if(this.token){
      if(this.userService.isLoggedIn()){
        this.globalService.isauthenticated = true
      }
      else{
        this.router.navigateByUrl('/login');
      }
      
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    this.userService.deleteToken();
    this.globalService.isauthenticated = false;
    this.router.navigateByUrl('/login');
  }

}
