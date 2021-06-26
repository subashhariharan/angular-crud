import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { crudModel } from 'src/app/app.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private readonly URL:string="http://localhost:8015/user";

  constructor(private http:HttpClient) { }


  create(data:crudModel):Observable<crudModel>{
    return this.http.post<crudModel>(this.URL,data)
  }

  update(data:crudModel):Observable<crudModel>{
    return this.http.put<crudModel>(this.URL,data);
  }

  getAll():Observable<crudModel[]>{
    return this.http.get<crudModel[]>("https://jsonplaceholder.typicode.com/users")
  }
  delete(id:any):Observable<crudModel[]>{
    return this.http.delete<crudModel[]>("https://jsonplaceholder.typicode.com/users")
  }
}
