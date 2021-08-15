import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { CompanyAction } from '../actions/company.action';
import { HttpService } from '../../services/http.service';
import { APIResponse, Company } from 'src/app/models';
import { Injectable } from '@angular/core';

class CompanyStateModel {
  companyRecordList: any[] = [];
}

@State<CompanyStateModel>({
  name: 'companyState',
  defaults: new CompanyStateModel(),
})
@Injectable()
export class CompanyState implements NgxsOnInit {
  constructor(private httpService: HttpService) {}
  ngxsOnInit({ setState }: StateContext<CompanyStateModel>) {
    this.httpService.getCompanies().subscribe((list: any) => {
      console.log(list);
      setState({
        companyRecordList: list,
      });
    });
    throw new Error('Method not implemented.');
  }

  @Selector()
  static getCompanyRecord(state: CompanyStateModel): any[] {
    return state.companyRecordList;
  }

  @Action(CompanyAction.GET)
  getCompanies(
    { getState, patchState }: StateContext<CompanyStateModel>,
    action: CompanyAction.GET
  ) {
    this.httpService.getCompanies().subscribe((list: any) => {
      console.log(list);
      patchState({
        companyRecordList: list,
      });
    });
  }

  @Action(CompanyAction.ADD)
  addSupervisor(
    { getState, patchState }: StateContext<CompanyStateModel>,
    action: CompanyAction.ADD
  ) {
    const list = getState().companyRecordList;
    console.log(action.payload);
    // IN CASE OF SERVICE CALL
    // return this.service.addCompany(action.payload)
    // 	.pipe(
    // 		tap((company: any) => {
    // 			list.push(company);
    // 			ctx.patchState({
    // 				companyRecordList: list,
    // 			});
    // 		}),
    // 		catchError((errors: any) => {
    // 			ctx.patchState({
    // 				// any error hadling on error
    // 			});
    // 			throw (errors);
    // 		})
    // 	);

    // ONLY FOR STAT MANAGEMENT
    list.push(action.payload);
    patchState({
      companyRecordList: list,
    });
  }
}
