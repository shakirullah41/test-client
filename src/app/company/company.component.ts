import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CompanyAction } from 'src/app/store/actions/company.action';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(private store: Store) {
    this.store.dispatch(new CompanyAction.GET()).subscribe((companyList) => {
      console.log(companyList);
    });
  }

  ngOnInit(): void {
    
  }
}
