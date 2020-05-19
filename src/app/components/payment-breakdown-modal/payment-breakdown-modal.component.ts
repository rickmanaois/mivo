import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource
} from '@angular/material';
import {
  SlideInOutAnimation
} from 'src/app/utils/animation';
import {
  Utility
} from 'src/app/utils/utility';

export interface TablesDTO {
  effectivityDate: string;
  dueDate: string;
  premium: number;
  netPremium: number;
  tax: number;
  commission: number;
}

@Component({
  selector: 'app-payment-breakdown-modal',
  templateUrl: './payment-breakdown-modal.component.html',
  styleUrls: ['./payment-breakdown-modal.component.css'],
  animations: [SlideInOutAnimation]
})
export class PaymentBreakdownModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef < PaymentBreakdownModalComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  paymentBreakdown: any[];

  displayedColumns: string[] = ['effectivityDate', 'dueDate', 'premium', 'netPremium', 'tax', 'commission'];
  dataSource = new MatTableDataSource();

  currencyCode = 'PHP';
  animationState = 'out';
  toggleLabel = 'Show Economic Values';

  quotationNumber: String;
  exchangeRate: String;

  ngOnInit(): void {
    this.paymentBreakdown = this.data.breakdown;

    this.quotationNumber = this.data.receipt["numPoliza"];
    this.exchangeRate = this.data.receipt["valCambio"];

    const currency = this.data.receipt["codMon"];
    if (currency == "2") {
      this.currencyCode = "USD";
    } else if (currency == "3") {
      this.currencyCode = "EUR"
    }

    const efectivityDate = new Date(this.data.receipt["fecEfecRecibo"]);
    const dueDate = new Date(this.data.receipt["fecVctoRecibo"]);

    const data: TablesDTO[] = [{
      effectivityDate: Utility.formatDate(efectivityDate),
      dueDate: Utility.formatDate(dueDate),
      premium: this.data.receipt["impRecibo"],
      netPremium: this.data.receipt["impNeta"],
      tax: this.data.receipt["impImptos"],
      commission: this.data.receipt["impComis"], //TODO di ko sure if yan yung commission
    }];
    this.dataSource = new MatTableDataSource(data);
  }

  toggle() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.toggleLabel = (this.animationState === 'out' ? 'Show' : 'Hide') + ' Economic Values';
  }

  close(b: boolean): void {
    this.dialogRef.close(b);
  }

}
