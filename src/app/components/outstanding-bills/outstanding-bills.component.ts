import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';

export interface OutstandingBillsDTO {
  policyHolder: string;
  policyNumber: string;
  currency: string;
  invoiceNumber: number;
  receiptAmount: string;
  commissionAmount: string;
  withholdingTax: string;
  source: string;
}

const ELEMENT_DATA: OutstandingBillsDTO[] = [{
    policyHolder: "JAMES, LeBRON",
    policyNumber: "1001661000178",
    currency: "PHP",
    invoiceNumber: 33432,
    receiptAmount: "560.00",
    commissionAmount: "44.80",
    withholdingTax: "0.00",
    source: "TRONWEB"
  },{
    policyHolder: "WADE, DYWANE",
    policyNumber: "2001892000786",
    currency: "PHP",
    invoiceNumber: 416512,
    receiptAmount: "1,974.96",
    commissionAmount: "624.00",
    withholdingTax: "93.60",
    source: "TRONWEB"
  },{
    policyHolder: "BRYANT, KOBE",
    policyNumber: "2001892000783",
    currency: "PHP",
    invoiceNumber: 33432,
    receiptAmount: "4,605.00",
    commissionAmount: "144.80",
    withholdingTax: "203.00",
    source: "TRONWEB"
  },{
    policyHolder: "MITCHELL, DONOVAN",
    policyNumber: "2001892000787",
    currency: "PHP",
    invoiceNumber: 87687,
    receiptAmount: "800.00",
    commissionAmount: "444.80",
    withholdingTax: "405.00",
    source: "TRONWEB"
  },{
    policyHolder: "ROSE, DERRICK",
    policyNumber: "2001892000788",
    currency: "PHP",
    invoiceNumber: 6323,
    receiptAmount: "560.00",
    commissionAmount: "44.80",
    withholdingTax: "0.00",
    source: "TRONWEB"
  },{
    policyHolder: "IRVING, KYRIE",
    policyNumber: "2001892000789",
    currency: "PHP",
    invoiceNumber: 132433,
    receiptAmount: "5600.00",
    commissionAmount: "4764.80",
    withholdingTax: "6780.00",
    source: "TRONWEB"
  }
];

@Component({
  selector: 'app-outstanding-bills',
  templateUrl: './outstanding-bills.component.html',
  styleUrls: ['./outstanding-bills.component.css']
})
export class OutstandingBillsComponent implements OnInit {

  displayedColumns: string[] = ['policyHolder', 'policyNumber', 'currency', 'invoiceNumber', 'receiptAmount', 'commissionAmount', 'withholdingTax', 'source'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
