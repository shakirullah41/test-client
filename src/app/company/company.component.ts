import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CompanyAction } from 'src/app/store/actions/company.action';
import { selectorOptionsMetaAccessor } from '@ngxs/store/src/utils/selector-utils';
import { Company, Marker } from '../models';
import { Observable } from 'rxjs';
import { CompanyState } from '../store/state/company.state';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public company: Array<Company> = [];
  public marker: any;
  @Select(CompanyState.getCompanyRecord)
  companyList$!: Observable<Company[]>;
  @Select(CompanyState.getselectedMarker)
  selectedMarker$!: Observable<Marker>;

  constructor(private store: Store) {
    this.companyList$.subscribe((c) => {
      this.company = c;
    });
    this.selectedMarker$.subscribe((c) => {
      this.marker = c;
    });
  }

  ngOnInit(): void {
    
  }
}
