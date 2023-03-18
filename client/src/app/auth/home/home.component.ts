import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { TaskComponent } from '../../components/task/task.component';
import { GlobalService } from '../../shared/global/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal, public globalService: GlobalService,private route: ActivatedRoute, public userService: UserService, private router: Router, private http: HttpClient) { }
  
  hastoken = false;
  token : any;
  message = '';
  user:any;
  taskData: any;
  createTask = false;
  deleteTask = false;
  editTask = false;
  taskComponent: any;

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.taskComponent = new TaskComponent(this.globalService,this.route,this.router,this.userService,this.http);
    if(this.token){
      if(this.userService.isLoggedIn()){
        this.globalService.isauthenticated = true;
        this.user =  this.userService.getUserPayload();
        this.message = 'Hi '+ this.user.username+ ' your are '+this.user.role;
        this.createTask = this.user.role == 'builder' ? true : false;
        this.editTask = this.user.role != 'admin' ? true : false;
        this.deleteTask = this.user.role == 'admin' ? true : false;
        this.http.get('http://localhost:3000/api/task/findMyTask/'+this.user._id+'/'+this.user.role).subscribe(
          res => {
            this.taskData = res
          }
        )
      }
      else{
        this.router.navigateByUrl('/login');
      }
      
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  deleteMyTask(content:any,id:any){
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',}).result.then((result) => {
      if(result == 'Ok'){
        this.taskComponent.delete(id);
      }
    }, (reason) => {});
    
  }
}
