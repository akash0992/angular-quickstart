import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators}   from '@angular/forms';
import {HttpModule, Http, Headers}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import forEach = ts.forEach;

@Component({
    selector: 'my-app',
    template: `
    <div class="container">
    <h1>List</h1>
    <div *ngIf="students.length">
    <div class="list-group">
        <div class="list-group-item" *ngFor="let student of students ;let index = index;">
            <span>{{student.name}} : | : {{student.email}} : | : {{student._id}}</span>
            <a (click)="deleteStudentData(student._id)" href="#" class="trash">Edit</a>
            <a (click)="deleteStudentData(student._id)" href="#" class="edit">X</a>
        </div>
    </div>
    </div>
    <h1>Add Student Form</h1>
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
export class AppComponent implements OnInit{
    studentForm;
    disabled = false;
    submitted = false;
    subjects = [
        {label: "C++", name: "cpp"},
        {label: "Python", name: "python"},
        {label: "Ruby", name: "ruby"}
    ];
    students:any = [];

    form:FormGroup;

    constructor(private fb:FormBuilder, private http:Http) {
        let formObj = {
            'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            'name': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            'gender': [null, Validators.required],
            'course': ['', Validators.required],
        };
        this.subjects.forEach((subject)=> {
            formObj[subject.name] = false;
        });
        this.studentForm = fb.group(formObj);
        // this.deleteStudentData();
        //this.updateStudentData();
    }

    /**
     * ngOnInit function
     */

    ngOnInit() {
        this.getData();
    }



    submitForm(value:any):void {
        if (this.studentForm.dirty && this.studentForm.valid) {
            this.disabled = true;
            let subjects = [];
            value.ruby && subjects.push('ruby');
            value.cpp && subjects.push('cpp');
            value.python && subjects.push('python');
            let student = {
                name:value.name,
                email:value.email,
                gender: value.gender,
                course: value.course,
                subjects: subjects
            };
            this.postStudentData(student);
            console.log('Reactive Form Data:')
            console.log(value);
            this.studentForm.reset()
        } else {
            this.submitted = true;
            console.log('Validation error in Data:')
        }

    }

    private headers = new Headers({'Content-Type': 'application/json'});
    // private studentsUrl = 'http://localhost:3000/users';  // URL to web api
    private studentsUrl = 'http://localhost:8080/api/students/';  // URL to web api



    getStudentData() {
        return this.http.get(this.studentsUrl, {headers: this.headers})
            .toPromise()
            .then(response => {
                this.students = response.json();
            })
            .catch(this.handleError);
    }
    getData(){
        this.getStudentData();
    }

    /// post data

    postStudentData(student):Promise<any[]> {
        return this.http
            .post(this.studentsUrl, JSON.stringify(student), {headers: this.headers})
            .toPromise()
            .then(res => {
                student._id = res.json()._id;
                this.students.push(student);
                // console.log(res.json()._id,"<<<<")
                return res.json().data;
            })
            .catch(this.handleError);
    }


    /// delete data

    deleteStudentData(id) {
        this.http
            .delete(this.studentsUrl + id, {headers: this.headers})
            .toPromise()
            .then(res => {
                this.students = this.students.filter((student)=>student._id != id);
                return res.json().data
            })
            .catch(this.handleError);
    }

    /// delete data

    updateStudentData():Promise<any[]> {
        this.id = '580a32f7660c54c61cd630eb';
        let student = {
            name: "updatedName",
            email: "updatedEmail@gmail.com",
            course: "MCA",
            gender: "male",
            subjets: ["ruby", "python"],
        }
        return this.http
            .put(this.studentsUrl + this.id, student, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }


    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }

}
