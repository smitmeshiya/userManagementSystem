import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

function emailValidator(control:AbstractControl){
  const email = control.value as string;
  if( email && !email.endsWith('.com')){
    return{'invalidEmail':true};
  }
  return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'ArrayForm Task';

  myForm!:FormGroup;
  Addremove:boolean = true;
  currentid:any;
  smit:boolean = false;
  items:any = [];
  
  itemsPerPage: number = 10;
  currentPage: number = 1;
  searchTerm:any = '';
  SortByParam:string = '';

  constructor(private fb:FormBuilder, private http:HttpClient, private taskService:TaskService, private router:Router){}

  ngOnInit(): void {
   this.myForm = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email,emailValidator]],
    roles:['',[Validators.required,Validators.minLength(5)]],
   });
   this.getData();
  };

  submit(){
    const db = this.myForm.value;
    console.log(db);
      this.taskService.postData(this.myForm.value).subscribe(res =>{
        this.getData();
        return res;
      });
    this.myForm.reset();
  };

  remove(index:any){
    (this.myForm.get('login') as FormArray).removeAt(index);
  };

  getData(){
    this.taskService.getData(this.currentPage, this.itemsPerPage).subscribe((res:any[])=>{
      this.items = res;
    });
  };

  deleteData(id:any){
     const userconfirm =  window.confirm('you want to delete user data ?');
     if(userconfirm){
       this.taskService.deleteData(id).subscribe((res:any)=>{
         this.getData()
       });
     }
  };

  fname:any;
  Email:any;
  Roles:any;
  EditData(item:any){
    this.fname = item.name,
    this.Email = item.email,
    this.Roles = item.roles,
    this.currentid = item.id,
    this.smit = true
  };

  update(){
    this.taskService.updateData(this.currentid,this.myForm.value).subscribe();
    window.location.reload();
  }

  filterData() {
    if (this.searchTerm.trim() === '') {
      return this.items;
    }

    const searchTermLowerCase = this.searchTerm.toLowerCase();
    return this.items.filter(item =>{
          item.name.toLowerCase().includes(searchTermLowerCase) ||
          item.email.toLowerCase().includes(searchTermLowerCase)
      }
      );
  }


  pageChanged(event: any) {
    this.currentPage = event;
    this.getData();
  }

  firstName:any;
  search(){
    if(this.firstName == ""){
      this.getData();
    }else{
      this.items = this.items.filter(res=>{
        return res.firstName.toLowerCase().match(this.firstName.toLowerCase());
      })
    }
  }

  key:string = 'name';
  reverse:boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

}


  


