import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/service/crud.service';


export class crudModel
{
  id:any;
  name!: string;
  email!: string;
  phone:string | undefined;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Crud';
  userList:crudModel[]=[];

  isEdit:boolean=false;
  constructor (private crudService:CrudService){

  }

  crud:crudModel = new crudModel();

  onSubmit(form:NgForm):void{
    console.log(form);
    if(form.form.valid){
      if(!this.isEdit){
        this.crudService.create(form.value).subscribe(res => {
          console.log(res)
          form.resetForm();
          this.getAll();
        })
      }else{
        this.crudService.update(form.value).subscribe(res => {
          console.log(res)
          form.resetForm();
          this.isEdit = false;
          this.getAll();
        })
      }
    }
    
    
  }
  getAll():void{
    this.crudService.getAll().subscribe(res=>{
      console.log(res)
      this.userList = res;
    })
  }
  edit(data:crudModel):void{
    console.log(data);
    this.isEdit = true;
    this.crud = data;
  }
  delete(id:number):void{
    console.log(id);
    const permission = window.confirm("Are you sure, You want to delete this data ???")
    if(permission){
      this.crudService.delete(id).subscribe(res=>{
        console.log("deleted")
        this.getAll();
      })
    }
    
  }

  ngOnInit(): void {
    this.getAll()
  }
}
