import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000/saveData';

  getData(page:number, itemsPerPage: number){
    const url = `http://localhost:3000/saveData?page=${page}&itemsPerPage=${itemsPerPage}`
    return this.http.get(this.url)
  }

  postData(data:any){
    const updateurl = 'http://localhost:3000/saveData/'
      return this.http.post(updateurl,data);
  }

  deleteData(id:any){
    const updateurl = 'http://localhost:3000/saveData/'

    return this.http.delete(updateurl+id)
  }

  updateData(id:any, data:any){
    const updateurl = 'http://localhost:3000/saveData/'
    
    return this.http.put<any>(updateurl+id,data);
  }

}
