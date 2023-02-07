import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.userService
      .userLogin(this.f["email"].value, this.f["password"].value)
      .pipe(first())
      .subscribe({ next: () => this.router.navigateByUrl("/") });
  }
}
