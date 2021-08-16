import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { CompanyAction } from '../actions/company.action';
import { HttpService } from '../../services/http.service';
import { APIResponse, Company } from 'src/app/models';
import { Injectable } from '@angular/core';
import { MapAction } from '../actions/map.action';

class CompanyStateModel {
  companyRecordList: any[] = [];
  companyAddresses: any[] = [];
  selectedMarker: any[] = [];
}

@State<CompanyStateModel>({
  name: 'companyState',
  defaults: new CompanyStateModel(),
})
@Injectable()
export class CompanyState implements NgxsOnInit {
  constructor(private httpService: HttpService) {}
  ngxsOnInit({ patchState }: StateContext<CompanyStateModel>) {
    this.httpService.getCompanies().subscribe((list: any) => {
      patchState({
        companyRecordList: list,
      });
    });
    this.httpService.getAddresses().subscribe((list: any) => {
      patchState({
        companyAddresses: list,
      });
    });
  }

  @Selector()
  static getCompanyRecord(state: CompanyStateModel) {
    return state.companyRecordList;
  }
  @Selector()
  static getAddresses(state: CompanyStateModel) {
    return state.companyAddresses;
  }
  @Selector()
  static getselectedMarker(state: CompanyStateModel) {
    return state.selectedMarker;
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

  @Action(MapAction.AddMarker)
  setMarker(
    { getState, patchState }: StateContext<CompanyStateModel>,
    { payload }: any
  ) {
    patchState({
      selectedMarker: payload,
    });
    console.log(getState());
  }
}
