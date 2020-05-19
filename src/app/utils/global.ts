import {
  page as p
} from '../constants/page';

export class Globals {
  public static page: String = 'dashboard';
  public static isLoadQuotation: boolean = false;

  static setPage(val: String) {
    this.page = val;
  }

  static getAppType() {
    if (Globals.page == p.QUO.CAR || Globals.page == p.QUO.ACC || Globals.page == p.QUO.TRA || Globals.page == p.QUO.HOM) {
      return "Q";
    } else if (Globals.page == p.ISS.CAR || Globals.page == p.ISS.ACC || Globals.page == p.ISS.TRA || Globals.page == p.ISS.HOM) {
      return "I";
    }
    return "";
  }

  static setLoadQuotation(val: boolean) {
    this.isLoadQuotation = val;
  }
}