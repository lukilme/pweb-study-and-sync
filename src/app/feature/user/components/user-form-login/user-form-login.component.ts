import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-user-form-login",
  templateUrl: "./user-form-login.component.html",
  styleUrl: "./user-form-login.component.scss",
})
export class UserFormLoginComponent {
  loginForm: FormGroup<{
    emailLoginField: FormControl<string | null>;
    passwordLoginField: FormControl<string | null>;
  }>;
  hide: boolean = true;

  constructor(private service: UserService) {
    this.loginForm = new FormGroup({
      emailLoginField: new FormControl<string | null>("", [
        Validators.required,
        Validators.email,
      ]),
      passwordLoginField: new FormControl<string | null>("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
