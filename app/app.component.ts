import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators}   from '@angular/forms';

@Component({
    selector: 'my-app',
    template: `
    <div class="container">
    <h1>Add Student Form</h1>{{student | json}}
    <form [formGroup]="studentForm" (ngSubmit)="submitForm(studentForm.value)">
     <div class="form-group" [ngClass]="{'has-error':!name.valid && !name.pristine && submitted}">
        <label>Name:</label>
        <input class="form-control" type="text" [formControl]="studentForm.controls['name']" #name="ngForm">
                <div class="alert alert-danger" *ngIf="name.errors && name.errors.required && (!email.pristine || submitted)">
                     Please enter a name.
                </div>
                <div class="alert alert-danger" *ngIf="name.errors && (name.errors.minlength || name.errors.maxlength) && (!email.pristine || submitted)">
                     Name field must have min 3 characters and max 10 characters.
                </div>
      </div>
      <!-- We are using the ngClass directive to conditionally add a class to our div if the form is invalid -->
      <div class="form-group" [ngClass]="{'has-error':!email.valid && !email.pristine && submitted}">
        <label>Email</label>
        <input class="form-control" type="text" [formControl]="studentForm.controls['email']" #email="ngForm">
                <div class="alert alert-danger" *ngIf="email.errors && email.errors.required && (!email.pristine || submitted)">
                     Please enter a email.
                </div>
                <div class="alert alert-danger" *ngIf="email.errors && email.errors.pattern && (!email.pristine || submitted)">
                     Please enter a valid email.
                </div>
      </div>
      <div class="form-group" [ngClass]="{'has-error':!studentForm.controls['gender'].valid && submitted}">
        <label>Gender</label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="gender" value="Male" [formControl]="studentForm.controls['gender']">
          Male
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="gender" value="Female" [formControl]="studentForm.controls['gender']">
          Female
        </label>
      </div>
       <div class="alert alert-danger" *ngIf="!studentForm.controls['gender'].valid && submitted">You must select a gender.</div>
       
       <div class="form-group" [ngClass]="{'has-error':!course.valid && submitted}">
        <label>Course</label>
        <select class="form-control" id="course" [formControl]="studentForm.controls['course']" #course="ngForm">
            <option value="">
            Select
            </option>
            <option>
            BCA
            </option>
            <option>
            MCA
            </option>
        </select>
        <div class="alert alert-danger" *ngIf="!course.valid && submitted">
                     Please select a course.
          </div>
      </div>
      
      <div class="form-group">
        <label for="alterEgo">Subjects</label>
        <br/>
        
        <div *ngFor="let subject of subjects">
            <span>{{subject.label}}</span>
            <input type="checkbox" class="" id="Subject1" [formControl]="studentForm.controls[subject.name]">
        </div>
        
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
      </form>
</div>
    `
})
export class AppComponent {
    studentForm;
    disabled = false;
    submitted = false;
    subjects = [
        {label: "C++", name: "cpp"},
        {label: "Python", name: "python"},
        {label: "Ruby", name: "ruby"}
    ];

    form:FormGroup;

    constructor(fb: FormBuilder) {
        let formObj = {
            'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            'name': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            'gender': [null, Validators.required],
            'course': ['', Validators.required],
        };
        this.subjects.forEach((subject)=>{
             formObj[subject.name] = false;
        });
        this.studentForm = fb.group(formObj)
    }

    submitForm(value:any):void {
        if (this.studentForm.dirty && this.studentForm.valid) {
            this.disabled = true;
            console.log('Reactive Form Data:')
            console.log(value);
        } else {
            this.submitted = true;
            console.log('Validation error in Data:')
        }

    }
}
