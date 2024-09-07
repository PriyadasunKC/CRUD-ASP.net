import { Observable } from 'rxjs';
import { StudentsService } from './../service/students.service';
import { Component, inject, OnInit } from '@angular/core';
import { Students } from '../types/student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{


  students!:Observable<Students[]>

  studentsService = inject(StudentsService);
  
  
  ngOnInit(): void {
    this.studentsService.getStudents()
      .subscribe(
        {
          next:(response)=> {
            console.log(response);
          }
        }
        ,
        error:(err) => {
          console.log(err);
        }
        
      )
  }
}
