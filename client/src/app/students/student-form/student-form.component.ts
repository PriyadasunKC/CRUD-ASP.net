import { StudentsService } from './../../service/students.service';
import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  form!:FormGroup;
  StudentsService = inject(StudentsService);
  constructor(private fb:FormBuilder){
  }

  onSubmit() {
    this.StudentsService.addStudent(this.form.value).subscribe({
      next:(response)=> {
        console.log(response)
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:[],
      address:[],
      phoneNumber:[],
      email:[]
    });
  }
}
