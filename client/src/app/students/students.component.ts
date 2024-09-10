import { Component, inject, OnInit } from '@angular/core';
import { StudentsService } from '../service/students.service';
import { Observable } from 'rxjs';
import { Students } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe,CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
  
})

export class StudentsComponent implements OnInit {

  students$!:Observable<Students[]>;
  studentService = inject(StudentsService);

  ngOnInit(): void {
   
    this.students$=this.studentService.getStudents() 
      
  }
}