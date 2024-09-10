import { StudentsService } from './../../service/students.service';
import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  form!:FormGroup;
  studentformSubscription!:Subscription;
  
  studentsService = inject(StudentsService);
  
  constructor(private fb:FormBuilder , private activatedRouter:ActivatedRoute){
  }


  ngOnDestroy(): void {
    this.studentformSubscription.unsubscribe();
  }

  onSubmit() {
    this.studentsService.addStudent(this.form.value).subscribe({
      next:(response)=> {
        console.log(response)
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe({
      next:(response)=> {
        console.log(response['id']);
      },
      error:(err)=> {
        console.log(err)
      }
    })
    this.form = this.fb.group({
      name:['',Validators.required],
      address:[],
      phoneNumber:[],
      email:['',Validators.email]
    });
  }
}
