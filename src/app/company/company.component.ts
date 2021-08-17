import { Component, OnInit } from '@angular/core';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  @Select(CompanyState.getCompanyRecord)
  companyList$!: Observable<Company[]>;
  @Select(CompanyState.getselectedMarker)
  selectedMarker$!: Observable<Marker>;
  name: any = '';
  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private action$: Actions
  ) {
    this.createForm();
    this.companyList$.subscribe((c) => {
      this.company = c;
    });
    this.selectedMarker$.subscribe((c) => {
      const { lat, long } = c;
      console.log(c);
      this.marker = c;
      this.name = c.lat;
      this.form.patchValue({ lat, long });
      console.log(this.form.value);
    });
  }

  ngOnInit(): void {}
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      name: [null, Validators.required],
      country: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      long: [null, [Validators.required]],
    });
  }

  onSubmit(post: any) {
    this.store.dispatch(new CompanyAction.ADD(post)).subscribe(() => {
      // this.store.dispatch(new Navigate(['companyList']));
    });

    // this.action$.pipe(ofActionSuccessful(CompanyAction.ADD)).subscribe(() => {
    //   // this.store.dispatch(new Navigate(['companyList']));
    // });
  }
}
