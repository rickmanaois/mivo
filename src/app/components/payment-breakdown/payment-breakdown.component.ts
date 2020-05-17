import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  SlideInOutAnimation
} from '../../utils/animation';
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
  selector: 'app-payment-breakdown',
  templateUrl: './payment-breakdown.component.html',
  styleUrls: ['./payment-breakdown.component.css'],
  animations: [SlideInOutAnimation]
})
export class PaymentBreakdownComponent implements OnInit {
  @Input() paymentBreakdown: any[];
  @Input() paymentReceipt: any;
  @Input() showExchangeRate: boolean;

  displayedColumns: string[] = ['effectivityDate', 'dueDate', 'premium', 'netPremium', 'tax', 'commission'];
  dataSource = new MatTableDataSource();

  currencyCode = 'PHP';
  animationState = 'out';
  toggleLabel = 'Show Economic Values';

  exchangeRate : String;

  constructor() {}

  ngOnInit(): void {
    this.exchangeRate = this.paymentReceipt["valCambio"];
    const currency = this.paymentReceipt["codMon"];
    if (currency == "2") {
      this.currencyCode = "USD";
    } else if (currency == "3") {
      this.currencyCode = "EUR"
    }

    const efectivityDate = new Date(this.paymentReceipt["fecEfecRecibo"]);
    const dueDate = new Date(this.paymentReceipt["fecVctoRecibo"]);

    const data: TablesDTO[] = [{
      effectivityDate: Utility.formatDate(efectivityDate),
      dueDate: Utility.formatDate(dueDate),
      premium: this.paymentReceipt["impRecibo"],
      netPremium: this.paymentReceipt["impNeta"],
      tax: this.paymentReceipt["impImptos"],
      commission: this.paymentReceipt["impComis"], //TODO di ko sure if yan yung commission
    }];
    this.dataSource = new MatTableDataSource(data);
  }

  toggle() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.toggleLabel = (this.animationState === 'out' ? 'Show' : 'Hide') + ' Economic Values';
  }

}
