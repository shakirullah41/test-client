export namespace CompanyAction {
  export class ADD {
    static readonly type = '[Company] Add company profile';
    constructor(public payload: any) {}
  }

  export class GET {
    static readonly type = '[Company] Get company profile';
    constructor() {}
  }
}
