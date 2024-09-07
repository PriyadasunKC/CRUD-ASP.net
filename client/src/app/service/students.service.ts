import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from '../types/student';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  getStudents=():Observable<Students[]>=> this.http.get<Students[]>("http://localhost:5229/api/students")
}
