import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  getStudents=():Observable<Students[]> => this.http.get<Students[]>("http://localhost:5229/api/students")
}