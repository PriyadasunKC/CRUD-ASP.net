import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = "http://localhost:5229/api/Student";
  
  constructor(private http:HttpClient) { }

  getStudents=():Observable<Students[]> => this.http.get<Students[]>(this.apiUrl)
  addStudent=(data:Students)=> this.http.post(this.apiUrl,data);
  getStudent=(id:number):Observable<Students>=> this.http.get<Students>(this.apiUrl+'/'+id);
  deleteStudent=(id:number)=> this.http.delete(this.apiUrl+'/'+id);
  editStudent=(id:number,data:Students)=> this.http.put(this.apiUrl+'/'+id,data);
}