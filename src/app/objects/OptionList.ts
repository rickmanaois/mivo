export class OptionList {
  language: string;
  columnName: string;
  param: string;
  constructor(language: string, columnName: string, param: string) {
    this.language = language;
    this.columnName = columnName;
    this.param = param;
  }
}
