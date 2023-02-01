import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaxItem } from "../models/tax.model";

@Injectable({
  providedIn: "root",
})
export class TaxService {
  constructor(private http: HttpClient) {}

  GetAllTax(): Observable<Array<TaxItem>> {
    return this.http.get<Array<TaxItem>>("http://52.221.237.5:4000/api/pajak");
  }
}
