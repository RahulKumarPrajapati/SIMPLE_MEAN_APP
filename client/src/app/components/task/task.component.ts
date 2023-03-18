import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute} from '@angular/router';
import { Task } from '../../shared/task/task.model'
import { NgForm,FormGroup, FormControl }  from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/shared/global/global.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(public globalService: GlobalService,private route: ActivatedRoute, private router: Router,private userService: UserService, private http: HttpClient) { }
  serverErrorMsg = '';
  passOrFail = 'danger';
  url = "http://localhost:3000/";
  message = '';
  user = this.userService.getUserPayload();
  task = new FormGroup({
    taskName: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    assignedBy: new FormControl(this.userService.getUserPayload()["_id"]),
    assignedTo: new FormControl('')
  });
  architectList: any;
  edit = false;
  taskId: any;
  ngOnInit(): void {
    if(this.router.url.includes('/task/edit')){
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.taskId = params.get('id');
      });
      this.http.get(this.url+'api/task/getTask/'+this.taskId).subscribe(
        response => {
          this.task = new FormGroup({
            _id: new FormControl(Object(response)._id),
            taskName: new FormControl(Object(response).taskName),
            description: new FormControl(Object(response).description),
            status: new FormControl(Object(response).status),
            assignedBy: new FormControl(this.userService.getUserPayload()["_id"]),
            assignedTo: new FormControl(Object(response).assignedTo)
          });
         }
      )
      this.edit = true
    }
    else if(this.router.url == '/task/add'){
      this.edit = false

    }
    if(this.user.role == 'admin'){
      this.router.navigate(['/']);
    }
    this.http.get(this.url+'api/fetchAllArchitect').subscribe(
      response => {
        this.architectList = response;
       }
    )
  }
  addTask(){
    this.http.post(this.url+'api/task/add',this.task.value).subscribe(
      response => {
        this.globalService.serverErrorMsg = 'Task added successfully.'; 
        this.globalService.passOrFail = 'success';
        this.router.navigate(['/']);
       },
      err => {
        this.globalService.serverErrorMsg = 'Some Error Occured! Please Try Again';
        this.globalService.passOrFail = 'danger';
        this.router.navigate(['/']);
      }
    )
  }

  editTask(){
    this.http.post(this.url+'api/task/edit',this.task.value).subscribe(
      response => {
        this.globalService.serverErrorMsg = 'Task updated successfully.'; 
        this.globalService.passOrFail = 'success';
        this.router.navigate(['/']);
       },
      err => {
        this.globalService.serverErrorMsg = 'Some Error Occured! Please Try Again';
        this.globalService.passOrFail = 'danger';
        this.router.navigate(['/']);
      }
    )
  }

  delete(id:any){
      this.http.delete(this.url+'api/task/delete/'+id).subscribe(
        response => {
          window.location.reload();
        }
      )
  }
}
