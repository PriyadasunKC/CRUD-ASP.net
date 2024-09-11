import { Component, inject, OnInit } from '@angular/core';
import { StudentsService } from '../service/students.service';
import { Observable } from 'rxjs';
import { Students } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe,CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
  
})

export class StudentsComponent implements OnInit {

  students$!:Observable<Students[]>;
  toasterService = inject(ToastrService);
  studentService = inject(StudentsService);


  ngOnInit(): void {
    this.getStudents();
  }

  deleteStudent(id:number) {
    this.studentService.deleteStudent(id).subscribe({
      next:(response)=> {
        this.toasterService.success('Student deleted successfully');
        this.getStudents();
      },
      error:(err)=> {
        console.log(err);
      }
    })
  }

  private getStudents():void {
    this.students$ = this.studentService.getStudents();
  }
}