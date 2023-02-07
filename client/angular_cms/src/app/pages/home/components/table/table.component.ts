import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { TaxItem } from "src/app/models/tax.model";
import { TaxService } from "src/app/services/tax.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styles: [
    "mat-header-cell {flex-direction: column;justify-content: center;}",
    "mat-cell {text-align: center;justify-content:center;}",
  ],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string> = [
    "position",
    "receiptNumber",
    "createdAt",
    "updatedBy",
    "status",
    "action",
  ];
  dataSource: Array<TaxItem> = [];

  taxSubscribtion: Subscription | undefined;

  constructor(private taxService: TaxService) {}

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.getTax();
  }
  ngOnDestroy() {
    if (this.taxSubscribtion) this.taxSubscribtion.unsubscribe();
  }

  getTax() {
    console.log("masuk", this.dataSource);
    this.taxSubscribtion = this.taxService
      .GetAllTax()
      .subscribe((_data: any): void => {
        this.dataSource = _data;
        console.log(this.dataSource);
      });
  }
}
