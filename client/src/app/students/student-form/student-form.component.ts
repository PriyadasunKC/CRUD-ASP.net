import { routes } from './../../app.routes';
import { StudentsService } from './../../service/students.service';
import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  paramsSubscription!:Subscription;
  isEdit=false;
  id=0;

  constructor(
    private fb:FormBuilder , 
    private activatedRouter:ActivatedRoute, 
    private router:Router,
    private toasterService:ToastrService,
  ) {}


  ngOnDestroy(): void {
    if(this.studentformSubscription) {
      this.studentformSubscription.unsubscribe();
    }
    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    } 
  }

  onSubmit() {
    if(!this.isEdit){
      this.studentsService.addStudent(this.form.value).subscribe({
        next:(response)=> {
          console.log(response);
          this.toasterService.success('Student added successfully'); 
          this.router.navigateByUrl('/students');
        },
        error:(err) => {
          console.log(err);
        }
      })
    }else{
      this.studentsService.editStudent(this.id,this.form.value).subscribe({
        next:(response)=> {
          console.log(response);
          this.toasterService.success('Student updated successfully'); 
          this.router.navigateByUrl('/students');
        },
        error:(err) => {
          this.toasterService.error('Student update failed');
        }
      })
    }
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next:(response)=> {
        console.log(response['id']);
        let id = response['id'];
        this.id = id;
        if(!id) return;
        
        this.studentsService.getStudent(id).subscribe({
          next:(response)=> {           
            this.form.patchValue(response);
            this.isEdit=true;
          },
          error:(err)=> {
            console.log(err);
          }
        })
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
