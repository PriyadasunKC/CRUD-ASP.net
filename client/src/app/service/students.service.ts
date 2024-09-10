import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = "http://localhost:5229/api/student";
  
  constructor(private http:HttpClient) { }

  getStudents=():Observable<Students[]> => this.http.get<Students[]>(this.apiUrl)
  addStudent=(data:Students)=> this.http.post(this.apiUrl,data)
}