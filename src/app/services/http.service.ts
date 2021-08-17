import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, APIResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<APIResponse<Company>> {
    return this.http.get<APIResponse<Company>>(
      'http://localhost:7000/api/company'
    );
  }
  addCompany(payload: any): Observable<APIResponse<Company>> {
    return this.http.post<APIResponse<Company>>(
      'http://localhost:7000/api/company',
      payload
    );
  }
  getAddresses(): Observable<APIResponse<Company>> {
    return this.http.get<APIResponse<Company>>(
      'http://localhost:7000/api/address'
    );
  }
}
