import { Injectable } from "@angular/core";
import { Service } from "../../../core/interfaces/service.interface";
import { User } from "../../../shared/model/user.model";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserValidator } from "./user.validator.service";
import { Router } from "@angular/router";
import { UserStorageService } from "../../../core/storage/user-storage.service";
import { Teacher } from "../../../shared/model/teacher.model";
import { Student } from "../../../shared/model/student.model";




@Injectable()
export class UserService implements Service<User> {
  private URL_USER = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient, private route : Router, private storage : UserStorageService) {}

  read(key: string): Observable<User>{
    return this.httpClient.get<User>(`${this.URL_USER}/${key}`);
  }

  update(newObj: User): Observable<User> {
    return this.httpClient.put<User>(`${this.URL_USER}/${newObj.id}`, newObj);
  }

  delete(key: string): Observable<Object> {
    return this.httpClient.delete(`${this.URL_USER}/${key}`);
  }

  readAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL_USER);
  }

  create(newUser: User): Observable<User> {
    return this.httpClient.post<User>(this.URL_USER, newUser);
  }

  readBy(key: string,value: string ): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.URL_USER}?${key}=${value}`);
  }

  register(userForm: UserRegisterData){

    UserValidator.registerValidate(userForm);
    let newUser : User;
    if(userForm.statusRegisterField=='teacher'){
      newUser = new Teacher(
        userForm.nameRegisterField,
        userForm.emailRegisterField,
        userForm.passwordRegisterField,
        new Date(userForm.birthdayRegisterField),
        'teacher',
       'Computer Scientis',
       []
      );
    }else{
      newUser = new Student(
        userForm.nameRegisterField,
        userForm.emailRegisterField,
        userForm.passwordRegisterField,
        new Date(userForm.birthdayRegisterField),
        'student',
       'Internet System',
       [],
       4
      );
    }   
    this.create(newUser).subscribe({
      next: value => {
        console.log('Observable emitted the next value: ' + value);
        return value;
      },
      error: err => {
        console.error('Observable emitted an error: ' + err);
        return null;
      }
    });
  }

  login(loginData: UserLoginData) {
    UserValidator.loginValidate(loginData);
    this.readBy("email", loginData.emailLoginField).subscribe({
      next: users => {
        if (users.length > 0) {
          console.log(users)
          if (true) {
            this.route.navigate(['home']);
          } else {
            console.error("Wrong password!");
          }
        } else {
          console.error("User not found!");
        }
      },
      error: err => {
        console.error('Observable emitted an error: ' + err);
      }
    });
  }

}
