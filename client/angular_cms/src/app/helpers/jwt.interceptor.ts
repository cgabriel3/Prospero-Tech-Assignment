import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.userService.userValue;
    const isLoggedIn = user && user.access_token;
    let isApiUrl = request.url.startsWith("http://52.221.237.5:4000/");

    if (request.url.endsWith("/login")) isApiUrl = false;

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          access_token: user.access_token,
        },
      });
    }
    return next.handle(request);
  }
}
