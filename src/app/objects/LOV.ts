export class LOV {
  tableName: string;
  version: string;
  params: string;
  constructor(tableName: string, version: string, params: string) {
    this.tableName = tableName;
    this.version = version;
    this.params = params;
  }
}
