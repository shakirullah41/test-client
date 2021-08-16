import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CompanyAction } from 'src/app/store/actions/company.action';
import { selectorOptionsMetaAccessor } from '@ngxs/store/src/utils/selector-utils';
import { Company } from '../models';
import { Observable } from 'rxjs';
import { CompanyState } from '../store/state/company.state';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public company: Array<Company> = [];
  @Select(CompanyState.getCompanyRecord)
  companyList$!: Observable<Company[]>;
  constructor(private store: Store) {
    this.companyList$.subscribe((c) => {
      this.company = c;
    });
  }

  ngOnInit(): void {}
}
