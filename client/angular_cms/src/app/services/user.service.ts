import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem("user")!)
    );
    this.user = this.userSubject.asObservable();
  }

  userLogin(email: string, password: string) {
    return this.http
      .post("http://52.221.237.5:4000/api/users/login", { email, password })
      .pipe(
        map((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res));
          return res;
        })
      );
  }

  public get userValue() {
    return this.userSubject.value;
  }
}
